import pytest
import os
from unittest.mock import patch, MagicMock
from src.dataset import get_dataloaders

@patch('src.dataset.ImageFolder')
@patch('src.dataset.DataLoader')
@patch('os.path.exists')
def test_get_dataloaders_success(mock_exists, mock_dataloader, mock_image_folder):
    # Arrange
    mock_exists.return_value = True
    mock_image_folder.return_value.classes = ['c1', 'c2']
    device = MagicMock()
    
    # Act
    train_dl, valid_dl, classes = get_dataloaders('dummy_path', 32, device)
    
    # Assert
    assert classes == ['c1', 'c2']
    assert mock_image_folder.call_count == 2
    assert mock_dataloader.call_count == 2

@patch('os.path.exists')
def test_get_dataloaders_path_not_exists(mock_exists):
    # Arrange
    mock_exists.return_value = False
    device = MagicMock()
    
    # Act & Assert
    with pytest.raises(FileNotFoundError):
        get_dataloaders('dummy_path', 32, device)
