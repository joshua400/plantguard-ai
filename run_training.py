import os
from model_training.src.train import train_model

def main():
    # Define the path to the downloaded dataset
    # The structure is somewhat nested due to the original zip file
    base_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(base_dir, "input", "new-plant-diseases-dataset", 
                            "New Plant Diseases Dataset(Augmented)", 
                            "New Plant Diseases Dataset(Augmented)")
    
    print(f"Looking for data in: {data_dir}")
    
    if not os.path.exists(data_dir):
        print("Data directory not found! Please check the download.")
        return

    # Train the model
    # Using a small number of epochs for demonstration
    model, history = train_model(data_dir, epochs=1, batch_size=32)
    
    print("Training complete!")

if __name__ == "__main__":
    main()
