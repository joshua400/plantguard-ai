import sys
import os
import io

# Add project root to path so we can import model_training
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import torch.nn.functional as F
from torchvision import transforms

from model_training.src.model import ResNet9
from model_training.src.utils import to_device, get_default_device

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables to hold model and classes
model = None
device = get_default_device()
classes = []

# Model path
MODEL_PATH = "plant-disease-model.pth"
DATA_DIR = "input/new-plant-diseases-dataset/New Plant Diseases Dataset(Augmented)/New Plant Diseases Dataset(Augmented)/train"

def load_model():
    global model, classes
    
    # Load classes from dataset directory if available
    if os.path.exists(DATA_DIR):
        classes = sorted(os.listdir(DATA_DIR))
        print(f"Loaded {len(classes)} classes from {DATA_DIR}")
    else:
        print("Warning: Dataset directory not found. Classes will be empty until fixed.")
        # Fallback list or empty
        classes = []

    # Initialize model structure
    if classes:
        model = ResNet9(3, len(classes))
        
        # Load weights if trained model exists
        if os.path.exists(MODEL_PATH):
            print(f"Loading model weights from {MODEL_PATH}")
            model.load_state_dict(torch.load(MODEL_PATH, map_location=device))
        else:
            print("Warning: Trained model file not found. Using random weights.")
            
        model = to_device(model, device)
        model.eval()
    else:
        print("Error: Could not determine classes, model not initialized.")

@app.on_event("startup")
async def startup_event():
    load_model()

def predict_image(img_tensor, model):
    xb = to_device(img_tensor.unsqueeze(0), device)
    out = model(xb)
    probs = F.softmax(out, dim=1)
    conf, preds = torch.max(probs, dim=1)
    return preds[0].item(), conf[0].item()

@app.get("/")
def read_root():
    return {
        "message": "Plant Disease Detection API is running",
        "endpoints": {
            "predict": "/predict (POST)",
            "health": "/health (GET)",
            "docs": "/docs (Swagger UI)"
        },
        "frontend": "Visit http://localhost:8080 to use the application"
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded (classes missing)")
        
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    try:
        # Read and transform image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        
        transform = transforms.Compose([
            transforms.Resize((256, 256)),
            transforms.ToTensor(),
        ])
        
        img_tensor = transform(image)
        
        # Predict
        idx, conf = predict_image(img_tensor, model)
        predicted_class = classes[idx]
        
        return {
            "disease": predicted_class,
            "confidence": round(conf * 100, 2)
        }
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "ok", "model_loaded": model is not None, "classes": len(classes)}
