# 🌿 PlantGuard AI: Intelligent Crop Disease Detection

[![Deep Learning](https://img.shields.io/badge/DL-PyTorch-EE4C2C.svg)](https://pytorch.org/)
[![Backend](https://img.shields.io/badge/API-FastAPI-009688.svg)](https://fastapi.tiangolo.com/)
[![Frontend](https://img.shields.io/badge/UI-React_&_Vite-61DAFB.svg)](https://vitejs.dev/)
[![Model Accuracy](https://img.shields.io/badge/Accuracy-98.66%25-brightgreen.svg)]()

**PlantGuard AI** is a full-stack deep learning application designed to help farmers and agronomists identify plant diseases in real-time. By leveraging a custom-trained **ResNet9** architecture, the system can classify 38 different plant-disease combinations with over 98% accuracy.

## 🚀 Key Features
- **Real-time Diagnostic**: Instantly detect diseases from plant leaf images.
- **GPU Acceleration**: High-performance inference powered by PyTorch and CUDA.
- **Rich Dashboard**: Modern, responsive UI built with React and Tailwind CSS.
- **Comprehensive Coverage**: Trained on a dataset of 87,000+ images across 38 categories.
- **Scalable Backend**: Robust FastAPI implementation with health monitoring and documentation.

## 🛠️ Technology Stack
- **Deep Learning**: PyTorch, Torchvision (ResNet9 Architecture)
- **Backend**: FastAPI, Uvicorn, Python 3.12
- **Frontend**: React, Vite, TypeScript, Tailwind CSS, Lucide Icons, Shadcn UI
- **Environment**: Virtual Environment (Conda/Venv) with CUDA 12.1 support

## 📊 Dataset & Model Performance
The model was trained on the **New Plant Diseases Dataset**, which contains approximately 70,295 training images and 17,572 validation images.

| Metric | Score |
| :--- | :--- |
| **Training Images** | 70,295 |
| **Validation Images** | 17,572 |
| **Classes** | 38 |
| **Validation Accuracy** | **98.66%** |
| **Architecture** | ResNet9 (Residual Blocks + Max Pooling) |
| **Learning Strategy** | OneCycle Learning Rate Policy |

## 🏗️ Project Structure
```text
├── api/                   # FastAPI Backend
│   ├── main.py            # API logic and model serving
│   └── requirements.txt   # Backend dependencies
├── model_training/        # Deep Learning Core
│   ├── src/               # Dataset, Model, and Training logic
│   ├── tests/             # Unit tests for model components
│   └── requirements.txt   # ML dependencies
├── src/                   # React Frontend (Vite)
├── input/                 # Plant Disease Dataset (Excluded from git)
└── plant-disease-model.pth # Trained Model Weights (Weights included)
```

## 🏁 Getting Started

### Prerequisites
- Python 3.12+
- Node.js & npm
- NVIDIA GPU (Optional, for re-training)

### 1. Setup Backend
```bash
# Navigate to the root folder
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r api/requirements.txt -r model_training/requirements.txt

# Start the Backend
python -m uvicorn api.main:app --reload
```

### 2. Setup Frontend
```bash
# In a new terminal
npm install
npm run dev
```

### 3. Usage
- Open your browser to `http://localhost:8080`.
- Navigate to the **"Check Disease"** page.
- Upload a clear leaf image and click **"Check Disease"**.

## 📖 Portfolio Context
*This project was developed to demonstrate full-stack AI integration, focusing on bridging the gap between high-performance deep learning models and user-friendly web interfaces. The use of ResNet9 provides a balance between inference speed and diagnostic accuracy, making it suitable for edge-case agricultural deployment.*

---
Developed with ❤️ by [Joshua Ragiland M]
