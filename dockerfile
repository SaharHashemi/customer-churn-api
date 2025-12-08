FROM python:3.11-slim

# Force Python 3.11 explicitly
ENV PYTHON_VERSION=3.11
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    build-essential \
    libffi-dev \
    libssl-dev \
    python3-dev \
    python3.11-dev \
    && rm -rf /var/lib/apt/lists/*

# Remove any existing Python 3.13 if present
RUN apt-get remove -y python3.13* 2>/dev/null || true

# Verify we're using Python 3.11
RUN python3.11 --version && python3.11 -m pip --version

# Use python3.11 explicitly for all pip commands
RUN python3.11 -m pip install --upgrade pip==24.0

# Install setuptools with explicit Python 3.11
RUN python3.11 -m pip install --no-cache-dir "setuptools==69.0.0" "wheel==0.42.0"

# Verify setuptools
RUN python3.11 -c "import setuptools; print('setuptools OK:', setuptools.__version__)"

# Copy requirements
COPY requirements.txt .

# Install numpy first
RUN python3.11 -m pip install --no-cache-dir --no-build-isolation numpy==1.24.3

# Install pandas
RUN python3.11 -m pip install --no-cache-dir --no-build-isolation pandas==2.0.3

# Install other packages individually
RUN python3.11 -m pip install --no-cache-dir --no-build-isolation \
    fastapi==0.104.1 \
    "uvicorn[standard]==0.24.0" \
    scikit-learn==1.3.2 \
    xgboost==2.0.3 \
    python-multipart==0.0.6 \
    jinja2==3.1.2 \
    aiofiles==23.2.1

# Copy application
COPY . .

# Create directories
RUN mkdir -p static templates

# Expose port
EXPOSE 8000

# Use python3.11 to run
CMD ["python3.11", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
