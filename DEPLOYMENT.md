# Quick Deployment Guide

## 🚀 Fastest Way to Get a Public IP/URL

### Option 1: Google Cloud Run
```bash
# 1. Install Google Cloud SDK
# 2. Login and set project
gcloud auth login
gcloud config set project YOUR_PROJECT_ID

# 3. Build and deploy
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/churn-api
gcloud run deploy churn-api \
  --image gcr.io/YOUR_PROJECT_ID/churn-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8000

gcloud run services describe churn-api --region us-central1
```

## 📦 Before Deploying

Make sure to have:
1. ✅ Your `telco_churn_models.pkl` file ready
2. ✅ All files committed to GitHub
3. ✅ Dockerfile is in the root directory

## 🧪 Test Locally First

```bash
# Test with Docker
docker-compose up --build

# Visit http://localhost:8000
# If it works locally, it will work in the cloud!
```

## ⚠️ Important Notes

1. **Model File**: Make sure to upload `telco_churn_models.pkl` to  cloud platform
2. **Free Tiers**: Most platforms have free tiers perfect for demos
3. **Auto-deploy**: Changes to your GitHub repo will auto-deploy on Railway/Render
4. **HTTPS**: All platforms provide HTTPS automatically

## 🆘 Troubleshooting

**App won't start?**
- Check that  model file is uploaded
- Verify Dockerfile is correct
- Check platform logs

**Can't access the URL?**
- Wait a few minutes for deployment to complete
- Check that port 8000 is exposed
- Verify  service is running

**Model not found error?**
- Ensure `telco_churn_models.pkl` is in the project root
- Check file permissions
- Verify the file is included in  deployment


