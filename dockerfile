FROM python:3.11-slim

# Set Python to use UTF-8 encoding
ENV PYTHONUNBUFFERED=1
ENV PYTHONIOENCODING=utf-8

WORKDIR /app

# Install system dependencies needed for building packages
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    build-essential \
    libffi-dev \
    libssl-dev \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Verify Python version
RUN python --version

# Upgrade pip to latest version
RUN pip install --upgrade pip==24.0

# Install setuptools and wheel FIRST with specific versions
RUN pip install --no-cache-dir "setuptools==69.0.0" "wheel==0.42.0"

# Verify setuptools is installed
RUN python -c "import setuptools; print('setuptools version:', setuptools.__version__)"

# Copy requirements first for better caching
COPY requirements.txt .

# Install numpy first (required for pandas) - use --no-build-isolation
RUN pip install --no-cache-dir --no-build-isolation numpy==1.24.3

# Install pandas (depends on numpy)
RUN pip install --no-cache-dir --no-build-isolation pandas==2.0.3

# Install rest of Python dependencies
RUN pip install --no-cache-dir --no-build-isolation \
    fastapi==0.104.1 \
    "uvicorn[standard]==0.24.0" \
    scikit-learn==1.3.2 \
    xgboost==2.0.3 \
    python-multipart==0.0.6 \
    jinja2==3.1.2 \
    aiofiles==23.2.1

# Copy application code
COPY . .

# Create directories for static files and templates
RUN mkdir -p static templates

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
