"""
Simple test script to verify the API is working.
Run this after starting the server to test the /predict endpoint.
"""
import requests
import json

# Test data - replace with actual feature names from your model
# This is just an example - you need to provide actual feature values
test_data = {
    "data": {
        # Add your actual feature names and values here
        # Example (replace with real features):
        # "feature_1": 1.0,
        # "feature_2": 0.5,
        # ...
    }
}

def test_api():
    url = "http://localhost:8000/predict"
    
    print("Testing Customer Churn Prediction API...")
    print(f"Sending request to: {url}")
    print(f"Test data: {json.dumps(test_data, indent=2)}")
    print("-" * 50)
    
    try:
        response = requests.post(url, json=test_data)
        response.raise_for_status()
        
        result = response.json()
        print("✅ API Response:")
        print(json.dumps(result, indent=2))
        
        if result.get("status") == "success":
            print("\n✅ Test PASSED!")
            print(f"Teacher Model Prediction: {result.get('teacher_model_prediction')}")
            print(f"Risk Model Prediction: {result.get('risk_model_prediction')}")
        else:
            print("\n❌ Test FAILED!")
            print(f"Error: {result.get('error')}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Error: Could not connect to the API.")
        print("Make sure the server is running: uvicorn main:app --reload")
    except requests.exceptions.RequestException as e:
        print(f"❌ Error: {e}")
        if hasattr(e.response, 'text'):
            print(f"Response: {e.response.text}")

if __name__ == "__main__":
    print("⚠️  NOTE: Update test_data with actual feature names from your model!")
    print("This script needs real feature values to work properly.\n")
    test_api()

