import torch
from .utils import to_device

def predict_image(img, model, classes, device):
    """
    Converts image to array and return the predicted class
    with highest probability
    
    Args:
        img (torch.Tensor): Image tensor.
        model (nn.Module): Trained model.
        classes (list): List of class names.
        device (torch.device): Device to run inference on.
        
    Returns:
        str: Predicted class label.
    """
    # Convert to a batch of 1
    xb = to_device(img.unsqueeze(0), device)
    # Get predictions from model
    yb = model(xb)
    # Pick index with highest probability
    _, preds  = torch.max(yb, dim=1)
    # Retrieve the class label
    return classes[preds[0].item()]
