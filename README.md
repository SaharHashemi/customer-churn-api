# Customer Churn Prediction API

A full-stack web application for predicting customer churn using machine learning models (XGBoost). Built with FastAPI, Docker, and a modern web interface.

## 🚀 Features

- **FastAPI Backend**: High-performance API for churn prediction
- **Machine Learning Models**: XGBoost-based teacher and risk models
- **Modern Web Interface**: Beautiful, responsive UI for predictions
- **Docker Support**: Deployment with Docker
- **Cloud Ready**: Deploy to any cloud platform

## 📋 Prerequisites

- Python 3.11+
- Docker and Docker Compose (for containerized deployment)
- model file: `telco_churn_models.pkl`

## 🛠️ Setup Instructions

### 1. Prepare Model File

Place `telco_churn_models.pkl` file in the project root directory. The model file contains:
- `xgb_teacher`: Teacher model for churn prediction
- `xgb_risk`: Risk model for churn prediction
- `feature_names`: List of feature names expected by the model

### 2. Local Development (Without Docker)

```bash
# Install dependencies
pip install -r requirements.txt

# Run the application
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Access the application at: `http://localhost:8000`

### 3. Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build and run with Docker directly
docker build -t churn-api .
docker run -p 8000:8000 -v $(pwd)/telco_churn_models.pkl:/app/telco_churn_models.pkl churn-api
```

Access the application at: `http://localhost:8000`

## ☁️ Cloud Deployment

### Option 1: Google Cloud Run

1. **Install Google Cloud SDK**
2. **Build and push Docker image**:
```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/churn-api
gcloud run deploy churn-api --image gcr.io/YOUR_PROJECT_ID/churn-api --platform managed --region us-central1 --allow-unauthenticated
```
3. **Get  URL**: Google Cloud Run provides a public URL

### Option 2: AWS EC2

1. **Launch an EC2 instance** (Ubuntu )
2. **SSH into  instance**
3. **Install Docker**:
```bash
sudo apt-get update
sudo apt-get install docker.io docker-compose -y
```
4. **Clone  repository**:
```bash
git clone REPO_URL
cd customer-churn-api
```
5. **Copy  model file** to the instance
6. **Run with Docker**:
```bash
docker-compose up -d
```
7. **Configure security group** to allow port 8000
8. **Get  public IP** from EC2 dashboard

### Option 3: DigitalOcean App Platform

1. **Sign up** at [DigitalOcean](https://www.digitalocean.com)
2. **Create App** → Connect GitHub
3. **Configure**:
   - Type: Web Service
   - Dockerfile path: `Dockerfile`
   - Port: 8000
4. **Add  model file** as a static asset
5. **Deploy**: DigitalOcean provides a public URL

## 📡 API Endpoints

### GET `/`
Returns the web interface for predictions.

### POST `/predict`
Predicts customer churn based on input data.

**Request Body:**
```json
{
  "data": {
    "feature1": value1,
    "feature2": value2,
    ...
  }
}
```

**Response:**
```json
{
  "teacher_model_prediction": 0,
  "risk_model_prediction": 0.1234,
  "status": "success"
}
```

## 📁 Project Structure

```
customer-churn-api/
├── main.py                 # FastAPI application
├── requirements.txt        # Python dependencies
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose configuration
├── telco_churn_models.pkl # Your ML model (add this file)
├── templates/
│   └── index.html        # Web interface
├── static/
│   ├── style.css         # Styling
│   └── script.js         # Frontend JavaScript
└── README.md             # This file
```

## 🔧 Configuration

set the model path using environment variable:
```bash
export MODEL_PATH=/path/to/your/model.pkl
```

## 🐛 Troubleshooting

### Model file not found
- Ensure `telco_churn_models.pkl` is in the project root
- Check file permissions
- Verify the file path in Docker volumes

### Port already in use
- Change the port in `docker-compose.yml` or Docker run command
- Update the port mapping: `"8080:8000"` instead of `"8000:8000"`

### Docker build fails
- Ensure all files are in the correct directories
- Check that `requirements.txt` is present
- Verify Docker is running

## 📝 Notes

- The model file (`telco_churn_models.pkl`) is excluded from git (see `.gitignore`)
- Make sure to upload model file to cloud platform
- For production, consider adding authentication and rate limiting
- The application runs on port 8000 by default

## 📧 Support

For issues or questions, please check:
1. Model file is correctly placed
2. All dependencies are installed
3. Docker is properly configured
4. Ports are accessible
