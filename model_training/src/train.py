import torch
import torch.nn as nn
from .utils import get_default_device, to_device
from .model import ResNet9

@torch.no_grad()
def evaluate(model, val_loader):
    model.eval()
    outputs = [model.validation_step(batch) for batch in val_loader]
    return model.validation_epoch_end(outputs)

def get_lr(optimizer):
    for param_group in optimizer.param_groups:
        return param_group['lr']
    
def fit_OneCycle(epochs, max_lr, model, train_loader, val_loader, weight_decay=0,
                grad_clip=None, opt_func=torch.optim.SGD):
    torch.cuda.empty_cache()
    history = []
    
    optimizer = opt_func(model.parameters(), max_lr, weight_decay=weight_decay)
    # scheduler for one cycle learniing rate
    sched = torch.optim.lr_scheduler.OneCycleLR(optimizer, max_lr, epochs=epochs, steps_per_epoch=len(train_loader))
    
    
    for epoch in range(epochs):
        # Training
        model.train()
        train_losses = []
        lrs = []
        for batch in train_loader:
            loss = model.training_step(batch)
            train_losses.append(loss)
            loss.backward()
            
            # gradient clipping
            if grad_clip: 
                nn.utils.clip_grad_value_(model.parameters(), grad_clip)
                
            optimizer.step()
            optimizer.zero_grad()
            
            # recording and updating learning rates
            lrs.append(get_lr(optimizer))
            sched.step()
            
    
        # validation
        result = evaluate(model, val_loader)
        result['train_loss'] = torch.stack(train_losses).mean().item()
        result['lrs'] = lrs
        model.epoch_end(epoch, result)
        history.append(result)
        
    return history

def train_model(data_dir, epochs=2, max_lr=0.01, batch_size=32, weight_decay=1e-4, grad_clip=0.1):
    from .dataset import get_dataloaders
    
    device = get_default_device()
    print(f"Using device: {device}")
    
    print("Loading data...")
    train_dl, valid_dl, classes = get_dataloaders(data_dir, batch_size, device)
    print(f"Classes: {classes}")
    
    print("Initializing model...")
    model = to_device(ResNet9(3, len(classes)), device)
    
    print("Starting training...")
    opt_func = torch.optim.Adam
    history = fit_OneCycle(epochs, max_lr, model, train_dl, valid_dl, 
                             grad_clip=grad_clip, 
                             weight_decay=weight_decay, 
                             opt_func=opt_func)
    
    # Save the trained model
    model_path = 'plant-disease-model.pth'
    torch.save(model.state_dict(), model_path)
    print(f"Model saved to {model_path}")
    
    return model, history
