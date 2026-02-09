import torch
from src.model import accuracy

def test_accuracy_calculation():
    # Arrange
    outputs = torch.tensor([[0.1, 0.9, 0.0], [0.8, 0.1, 0.1]]) # Preds: 1, 0
    labels = torch.tensor([1, 0])
    
    # Act
    acc = accuracy(outputs, labels)
    
    # Assert
    assert acc.item() == 1.0

def test_accuracy_calculation_mixed():
    # Arrange
    outputs = torch.tensor([[0.1, 0.9, 0.0], [0.1, 0.1, 0.8]]) # Preds: 1, 2
    labels = torch.tensor([1, 0]) # Actual: 1, 0
    
    # Act
    acc = accuracy(outputs, labels)
    
    # Assert
    # 1 correct out of 2 -> 0.5
    assert acc.item() == 0.5
