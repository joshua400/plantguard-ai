import os
import torch
import torchvision.transforms as transforms
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader
from .utils import DeviceDataLoader, to_device

def get_dataloaders(data_dir, batch_size, device, num_workers=2):
    """
    Creates and returns training and validation dataloaders.
    
    Args:
        data_dir (str): Path to the dataset directory containing 'train' and 'valid' folders.
        batch_size (int): Batch size.
        device (torch.device): Device to move data to.
        num_workers (int): Number of worker processes.
        
    Returns:
        tuple: (train_dl, valid_dl, classes)
    """
    train_dir = os.path.join(data_dir, "train")
    valid_dir = os.path.join(data_dir, "valid")
    
    # Check if directories exist
    if not os.path.exists(train_dir):
        raise FileNotFoundError(f"Training directory not found at {train_dir}")
    if not os.path.exists(valid_dir):
        raise FileNotFoundError(f"Validation directory not found at {valid_dir}")

    # Transforms
    train_transform = transforms.ToTensor()
    valid_transform = transforms.ToTensor()

    # Datasets
    train_ds = ImageFolder(train_dir, transform=train_transform)
    valid_ds = ImageFolder(valid_dir, transform=valid_transform)
    
    classes = train_ds.classes
    
    # Subset for debugging/rapid testing
    if os.environ.get('RAPID_TRAINING') == 'true':
        print("⚡ RAPID TRAINING MODE: Using only 5% of data ⚡")
        from torch.utils.data import Subset
        import numpy as np
        
        # Pick 1% of indices randomly
        subset_size = int(0.01 * len(train_ds))
        indices = np.random.choice(len(train_ds), subset_size, replace=False)
        train_ds = Subset(train_ds, indices)
        # We keep classes attribute for compatibility
        train_ds.classes = classes


    # DataLoaders
    # num_workers=0 and pin_memory=False to avoid Windows issues
    train_dl = DataLoader(train_ds, batch_size, shuffle=True, num_workers=0)
    valid_dl = DataLoader(valid_ds, batch_size, num_workers=0)
    
    # Move to device
    train_dl = DeviceDataLoader(train_dl, device)
    valid_dl = DeviceDataLoader(valid_dl, device)
    
    return train_dl, valid_dl, classes
