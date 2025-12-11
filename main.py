from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import pickle
import pandas as pd
import numpy as np
import os

# -----------------------------
# Load Model
# -----------------------------
MODEL_PATH = os.getenv("MODEL_PATH", "telco_churn_models.pkl")

xgb_teacher = None
xgb_risk = None
FEATURE_NAMES = []

try:
    if os.path.exists(MODEL_PATH):
        with open(MODEL_PATH, "rb") as f:
            model_dict = pickle.load(f)
        xgb_teacher = model_dict["xgb_teacher"]
        xgb_risk = model_dict["xgb_risk"]
        FEATURE_NAMES = model_dict["feature_names"]
        print(f"✅ Model loaded successfully from {MODEL_PATH}")
    else:
        print(f"⚠️ Warning: Model file '{MODEL_PATH}' not found. App will run but predictions won't work.")
except Exception as e:
    print(f"⚠️ Error loading model: {e}. App will run but predictions won't work.")


# -----------------------------
# FastAPI App
# -----------------------------
app = FastAPI(title="Customer Churn Prediction API")

# Mount static files - create directory if needed
static_dir = "static"
templates_dir = "templates"

# Ensure directories exist
os.makedirs(static_dir, exist_ok=True)
os.makedirs(templates_dir, exist_ok=True)

# Mount static files
try:
    app.mount("/static", StaticFiles(directory=static_dir), name="static")
    print("✅ Static files mounted")
except Exception as e:
    print(f"⚠️ Could not mount static files: {e}")

# Setup templates
try:
    templates = Jinja2Templates(directory=templates_dir)
    print("✅ Templates loaded")
except Exception as e:
    print(f"⚠️ Could not load templates: {e}")
    templates = None

@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    """Home page - show web interface"""
    try:
        if templates:
            return templates.TemplateResponse("index.html", {"request": request})
        else:
            # Fallback HTML if templates not available
            return HTMLResponse(content="""
            <!DOCTYPE html>
            <html>
            <head><title>Customer Churn Prediction API</title></head>
            <body style="font-family: Arial; padding: 40px; text-align: center;">
                <h1>🔮 Customer Churn Prediction API</h1>
                <p>API is running! Use /predict endpoint for predictions.</p>
                <p>Model status: """ + ("✅ Loaded" if xgb_teacher else "⚠️ Not loaded") + """</p>
            </body>
            </html>
            """)
    except Exception as e:
        return HTMLResponse(content=f"<h1>Error</h1><p>{str(e)}</p>", status_code=500)

@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "ok",
        "model_loaded": xgb_teacher is not None
    }

@app.get("/api/features")
def get_features():
    """Get feature names from the model"""
    return {
        "feature_names": FEATURE_NAMES,
        "total_features": len(FEATURE_NAMES),
        "model_loaded": xgb_teacher is not None
    }

# -----------------------------
# Request Schema
# -----------------------------
class CustomerData(BaseModel):
    data: dict

# -----------------------------
# Build X from Input (MANDATORY FUNCTION)
# -----------------------------
def build_X_from_input(input_dict: dict, feature_names: list):
    """
    Build X array matching feature_names order exactly.
    This is the ONLY allowed method for creating model input.
    
    Args:
        input_dict: dict coming from UI / API (keys must match feature_names exactly)
        feature_names: loaded from telco_churn_models.pkl
    
    Returns:
        X: numpy array of shape (1, len(feature_names)) with exact feature order
    """
    if not feature_names:
        raise ValueError("Model not loaded. Feature names are not available.")
    
    # Initialize X with zeros, matching feature_names order exactly
    X = np.zeros((1, len(feature_names)))
    
    def set_val(feat, val):
        """Set feature value at correct index matching feature_names order"""
        if feat in feature_names:
            idx = feature_names.index(feat)
            try:
                X[0, idx] = float(val) if val is not None and val != '' else 0.0
            except (ValueError, TypeError):
                X[0, idx] = 0.0
    
    # -------- MAP ALL FEATURES FROM INPUT DICT TO EXACT POSITIONS --------
    # This ensures feature order matches feature_names 100%
    for feat_name, feat_value in input_dict.items():
        if feat_name in feature_names:
            set_val(feat_name, feat_value)
    
    # Handle one-hot encoded categorical features that might come as separate keys
    # (e.g., "Internet Type_DSL", "Internet Type_Fiber Optic" from frontend)
    # These should already be in input_dict, but we ensure they're set correctly
    
    # Check for categorical features that might need special handling
    # If frontend sends "Internet Type" = "Fiber Optic", we need to set "Internet Type_Fiber Optic" = 1
    # But if frontend already sends "Internet Type_Fiber Optic" = 1, that's fine too
    
    # Internet Type - handle if sent as single value
    if "Internet Type" in input_dict and "Internet Type" not in feature_names:
        internet_type = str(input_dict.get("Internet Type", "Unknown"))
        # Find matching feature in feature_names
        for feat in feature_names:
            if feat.startswith("Internet Type_"):
                category = feat.replace("Internet Type_", "")
                if category == internet_type:
                    set_val(feat, 1)
                else:
                    set_val(feat, 0)
    
    # Contract - handle if sent as single value
    if "Contract" in input_dict and "Contract" not in feature_names:
        contract = str(input_dict.get("Contract", "Unknown"))
        # Find matching feature in feature_names
        for feat in feature_names:
            if feat.startswith("Contract_"):
                category = feat.replace("Contract_", "")
                if category == contract:
                    set_val(feat, 1)
                else:
                    set_val(feat, 0)
    
    # MANDATORY SANITY CHECK
    non_zero_count = np.count_nonzero(X)
    feature_sum = np.sum(X)
    
    print(f"🔍 Sanity Check:")
    print(f"   Non-zero features: {non_zero_count}")
    print(f"   Sum of features: {feature_sum}")
    
    if non_zero_count == 0:
        raise ValueError("❌ ERROR: All features are zero! Input is incorrect.")
    if non_zero_count < 5:
        print(f"⚠️ WARNING: Very few non-zero features ({non_zero_count}). Expected 5-15.")
    if feature_sum == 0:
        raise ValueError("❌ ERROR: Sum of features is zero! Input is incorrect.")
    
    return X

# -----------------------------
# Prediction Endpoint
# -----------------------------
@app.post("/predict")
def predict(payload: CustomerData):
    """Predict customer churn using ONLY xgb_teacher.predict_proba()"""
    if xgb_teacher is None:
        return {
            "error": "Model not loaded. Please ensure telco_churn_models.pkl is in the project directory.",
            "status": "error"
        }
    
    try:
        # Debug: Log input data
        print(f"📥 Received {len(payload.data)} features")
        print(f"Sample features: {list(payload.data.keys())[:10]}")
        
        # Log critical input values BEFORE processing
        critical_inputs = {
            'Tenure in Months': payload.data.get('Tenure in Months', 'MISSING'),
            'Monthly Charge': payload.data.get('Monthly Charge', 'MISSING'),
            'Satisfaction Score': payload.data.get('Satisfaction Score', 'MISSING'),
            'Total Charges': payload.data.get('Total Charges', 'MISSING'),
            'Number of Referrals': payload.data.get('Number of Referrals', 'MISSING'),
            'Avg Monthly Long Distance Charges': payload.data.get('Avg Monthly Long Distance Charges', 'MISSING')
        }
        print(f"🔍 Input values BEFORE processing: {critical_inputs}")
        
        # Check categorical values
        internet_types = [k for k in payload.data.keys() if k.startswith('Internet Type_') and payload.data[k] == 1]
        contracts = [k for k in payload.data.keys() if k.startswith('Contract_') and payload.data[k] == 1]
        print(f"🔍 Internet Type from input: {internet_types}")
        print(f"🔍 Contract from input: {contracts}")
        
        # 1. Build X array matching feature_names order exactly
        X = build_X_from_input(payload.data, FEATURE_NAMES)
        
        print(f"✅ Built X array shape: {X.shape}")
        print(f"✅ Expected {len(FEATURE_NAMES)} features, got {X.shape[1]}")
        
        # Verify critical values AFTER building X
        tenure_idx = FEATURE_NAMES.index('Tenure in Months') if 'Tenure in Months' in FEATURE_NAMES else -1
        monthly_idx = FEATURE_NAMES.index('Monthly Charge') if 'Monthly Charge' in FEATURE_NAMES else -1
        sat_idx = FEATURE_NAMES.index('Satisfaction Score') if 'Satisfaction Score' in FEATURE_NAMES else -1
        
        if tenure_idx >= 0:
            print(f"🔍 After building X - Tenure: {X[0, tenure_idx]}")
        if monthly_idx >= 0:
            print(f"🔍 After building X - Monthly Charge: {X[0, monthly_idx]}")
        if sat_idx >= 0:
            print(f"🔍 After building X - Satisfaction: {X[0, sat_idx]}")
        
        # 2. Get binary prediction from teacher model
        binary_pred = xgb_teacher.predict(X)[0]
        
        # 3. Get probability from teacher model (THIS IS THE ONLY SOURCE FOR RISK)
        if hasattr(xgb_teacher, 'predict_proba'):
            proba = xgb_teacher.predict_proba(X)[0]
            print(f"🔍 Raw proba array: {proba}")
            if len(proba) >= 2:
                # Binary classification - get probability of class 1 (churn)
                churn_probability = float(proba[1])
            else:
                # Single class - use the value directly
                churn_probability = float(proba[0])
        else:
            # Fallback if predict_proba not available (shouldn't happen with XGBoost)
            print("⚠️ WARNING: predict_proba not available, using binary prediction")
            churn_probability = float(binary_pred)
        
        print(f"🔍 Calculated churn_probability: {churn_probability:.6f}")
        
        # 4. Determine risk level based on probability (business rule)
        if churn_probability < 0.3:
            risk_level = "Low"
        elif churn_probability > 0.7:
            risk_level = "High"
        else:
            risk_level = "Medium"
        
        print(f"📊 Predictions:")
        print(f"   Binary prediction (0=No Churn, 1=Churn): {binary_pred}")
        print(f"   Churn probability: {churn_probability:.6f} ({churn_probability*100:.4f}%)")
        print(f"   Risk level: {risk_level}")

        # 5. Return response
        return {
            "teacher_model_prediction": int(binary_pred),
            "risk_model_prediction": float(churn_probability),  # This is the probability from teacher model
            "risk_level": risk_level,  # Low/Medium/High based on thresholds
            "status": "success"
        }
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"❌ Error in prediction: {error_details}")
        return {
            "error": str(e),
            "status": "error"
        }

if __name__ == "__main__":
    import uvicorn
    import socket
    
    def is_port_available(port):
        """Check if a port is available"""
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(('0.0.0.0', port))
                return True
            except OSError:
                return False
    
    # Try to use port from environment, or default to 5000
    start_port = int(os.getenv("PORT", 5000))
    port = start_port
    max_attempts = 10
    
    # Find available port
    for attempt in range(max_attempts):
        if is_port_available(port):
            break
        else:
            if attempt == 0:
                print(f"⚠️ Port {port} is busy, trying alternative ports...")
            port = start_port + attempt + 1
    else:
        print(f"❌ Could not find available port after {max_attempts} attempts")
        print(f"💡 Please close applications using ports {start_port}-{start_port + max_attempts}")
        port = start_port  # Try anyway, might work
    
    print(f"🚀 Starting server on port {port}...")
    print(f"")
    print(f"=" * 50)
    print(f"✅ Server is ready!")
    print(f"📱 Open your browser to: http://localhost:{port}")
    print(f"   (NOT http://0.0.0.0:{port} - use localhost instead)")
    print(f"=" * 50)
    print(f"")
    uvicorn.run(app, host="0.0.0.0", port=port)
