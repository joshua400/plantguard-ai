import { useState } from "react";
import { Upload } from "lucide-react";

type PredictionResult = {
  disease: string;
  confidence: number;
};

const CheckDisease = () => {
  // IMAGE STATES
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // RESULT STATE
  const [result, setResult] = useState<PredictionResult | null>(null);

  // Handle file select (click)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  // Handle drag over
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  // AI prediction via API
  const handleCheckDisease = async () => {
    if (!image) {
      alert("Please upload an image first");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch("/api/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Prediction failed");
      }

      const data = await response.json();

      setResult({
        disease: data.disease,
        confidence: data.confidence,
      });
    } catch (error) {
      console.error(error);
      alert("Error analyzing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-10">
      {/* Upload Box */}
      <label
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="flex flex-col items-center justify-center w-full max-w-xl p-10
                   border-2 border-dashed border-green-400 rounded-xl cursor-pointer
                   bg-green-50 hover:bg-green-100 transition"
      >
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="p-4 rounded-full bg-green-100 text-green-700">
            <Upload size={28} strokeWidth={1.8} />
          </div>

          <p className="text-lg font-semibold text-green-700">
            Upload plant leaf image
          </p>

          <p className="text-sm text-green-600">
            Drag and drop or click to browse
          </p>

          <p className="text-xs text-gray-500">
            PNG, JPG, WEBP up to 10MB
          </p>
        </div>

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>

      {/* Image Preview */}
      {preview && (
        <img
          src={preview}
          alt="preview"
          className="w-64 rounded-xl shadow"
        />
      )}

      {/* Check Button */}
      <button
        onClick={handleCheckDisease}
        disabled={loading}
        className="rounded-lg bg-green-600 px-6 py-2 text-white
                   hover:bg-green-700 transition disabled:opacity-60"
      >
        {loading ? "Analyzing..." : "Check Disease"}
      </button>

      {/* Result */}
      {result && (
        <div className="rounded-xl border border-green-300 bg-green-50 p-4 text-center w-64">
          <h3 className="font-bold text-green-800">
            Disease: {result.disease}
          </h3>
          <p className="text-green-700">
            Confidence: {result.confidence}%
          </p>
        </div>
      )}
    </div>
  );
};

export default CheckDisease;



