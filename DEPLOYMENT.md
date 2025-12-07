# Quick Deployment Guide

## 🚀 Fastest Way to Get a Public IP/URL

### Option 1: Railway (Easiest - Recommended for Students)

1. Go to [railway.app](https://railway.app) and sign up (free tier available)
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account and select this repository
4. **Important**: Add your `telco_churn_models.pkl` file:
   - Click on your project
   - Go to "Variables" tab
   - Or upload the file through Railway's file system
5. Railway will automatically:
   - Detect your Dockerfile
   - Build and deploy your app
   - Give you a public URL like: `https://your-app-name.railway.app`
6. **Share this URL with your professor!**

**Railway Benefits:**
- ✅ Free tier (enough for demos)
- ✅ Automatic HTTPS
- ✅ Public URL/IP provided
- ✅ Easy to use

### Option 2: Render (Also Easy)

1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Settings:
   - **Build Command**: `docker build -t churn-api .`
   - **Start Command**: `docker run -p 8000:8000 churn-api`
   - **Port**: `8000`
5. Add your `telco_churn_models.pkl` file in the dashboard
6. Click "Create Web Service"
7. Render will give you a URL like: `https://your-app.onrender.com`

### Option 3: Google Cloud Run (Free Tier Available)

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

# 4. Get your URL
gcloud run services describe churn-api --region us-central1
```

## 📦 Before Deploying

Make sure you have:
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

## 📝 What to Share with Your Professor

Once deployed, share:
- **Public URL**: The URL provided by your cloud platform
- **API Endpoint**: `https://your-url.com/predict`
- **Web Interface**: `https://your-url.com/`

## ⚠️ Important Notes

1. **Model File**: Make sure to upload `telco_churn_models.pkl` to your cloud platform
2. **Free Tiers**: Most platforms have free tiers perfect for demos
3. **Auto-deploy**: Changes to your GitHub repo will auto-deploy on Railway/Render
4. **HTTPS**: All platforms provide HTTPS automatically

## 🆘 Troubleshooting

**App won't start?**
- Check that your model file is uploaded
- Verify Dockerfile is correct
- Check platform logs

**Can't access the URL?**
- Wait a few minutes for deployment to complete
- Check that port 8000 is exposed
- Verify your service is running

**Model not found error?**
- Ensure `telco_churn_models.pkl` is in the project root
- Check file permissions
- Verify the file is included in your deployment

