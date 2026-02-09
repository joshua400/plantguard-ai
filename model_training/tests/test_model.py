import torch
import pytest
from src.model import ResNet9

def test_resnet9_forward_pass():
    # Arrange
    batch_size = 2
    channels = 3
    height = 256
    width = 256
    num_classes = 38
    
    model = ResNet9(in_channels=channels, num_diseases=num_classes)
    dummy_input = torch.randn(batch_size, channels, height, width)
    
    # Act
    output = model(dummy_input)
    
    # Assert
    assert output.shape == (batch_size, num_classes)
    assert not torch.isnan(output).any()

def test_resnet9_initialization():
    num_classes = 10
    model = ResNet9(3, num_classes)
    assert isinstance(model, torch.nn.Module)
