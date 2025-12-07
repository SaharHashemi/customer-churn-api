from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import pickle
import pandas as pd
import os

# -----------------------------
# Load Model
# -----------------------------
MODEL_PATH = os.getenv("MODEL_PATH", "telco_churn_models.pkl")

try:
    with open(MODEL_PATH, "rb") as f:
        model_dict = pickle.load(f)
    xgb_teacher = model_dict["xgb_teacher"]
    xgb_risk = model_dict["xgb_risk"]
    FEATURE_NAMES = model_dict["feature_names"]
except FileNotFoundError:
    print(f"Warning: Model file '{MODEL_PATH}' not found. Please ensure the model file is in the project directory.")
    xgb_teacher = None
    xgb_risk = None
    FEATURE_NAMES = []


# -----------------------------
# FastAPI App
# -----------------------------
app = FastAPI(title="Customer Churn Prediction API")
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")
@app.get("/", response_class=HTMLResponse)
def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


# -----------------------------
# Request Schema
# -----------------------------
class CustomerData(BaseModel):
    data: dict   # کل ورودی می‌آید داخل این دیکشنری


# -----------------------------
# Preprocess Function
# -----------------------------
def preprocess_input(input_data: dict):
    """
    ورودی JSON → تبدیل به دیتافریم با همه 1409 ستون مدل.
    ستون‌های اضافه حذف می‌شوند.
    ستون‌های موجود نبودند = صفر گذاشته می‌شوند.
    """

    df = pd.DataFrame([input_data])

    # ایجاد ستون‌های گمشده
    for col in FEATURE_NAMES:
        if col not in df.columns:
            df[col] = 0

    # حذف ستون‌های اضافی
    df = df[FEATURE_NAMES]

    return df


# -----------------------------
# Prediction Endpoint
# -----------------------------
@app.post("/predict")
def predict(payload: CustomerData):
    if xgb_teacher is None or xgb_risk is None:
        return {
            "error": "Model not loaded. Please ensure telco_churn_models.pkl is in the project directory.",
            "status": "error"
        }
    
    try:
        # 1. تبدیل به دیتافریم مناسب مدل
        df = preprocess_input(payload.data)

        # 2. پیش‌بینی
        pred1 = xgb_teacher.predict(df)[0]
        pred2 = xgb_risk.predict(df)[0]

        # 3. بازگشت پاسخ
        return {
            "teacher_model_prediction": int(pred1),
            "risk_model_prediction": float(pred2),
            "status": "success"
        }
    except Exception as e:
        return {
            "error": str(e),
            "status": "error"
        }
