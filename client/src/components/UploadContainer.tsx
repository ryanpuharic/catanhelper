import React, { useState } from 'react';

const UploadContainer = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [analyzedBoard, setAnalyzedBoard] = useState<string | null>(null);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    setError('');
    setUploading(true);
    setAnalyzedBoard(null);  
  
    const formData = new FormData();
    formData.append('image', file);
  
    try {
      const baseUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000' 
        : 'https://catanhelper-backend.onrender.com';
      
      const response = await fetch(`${baseUrl}/upload_board`, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Unable to analyze board');
      }
  
      if (data.success && data.image_path) {
        const imagePath = data.image_path.startsWith('/') ? data.image_path : `/${data.image_path}`;
        setAnalyzedBoard(`${baseUrl}${imagePath}?t=${Date.now()}`);
      }
    } catch (err) {
      console.error('Upload error:', err);
      
      let friendlyError = "Unable to process request. Please try again.";
      if (err instanceof Error) {
        friendlyError = err.message.includes('Invalid') || 
          err.message.includes('corrupted') || 
          err.message.includes('tile data')
          ? "Unable to analyze image. Please ensure it's a clear Catan board screenshot."
          : "Unable to process request. Please try again.";
      }
      
      setError(friendlyError);
    }
     finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-content">
      <div className="upload-tools">
        <div className="upload-text">
          <h2 className="text-2xl font-bold mb-2">Upload a Board</h2>
          <p className="text-gray-600">Works best with colonist.io screenshots</p>
        </div>


        <label htmlFor="image-input" className="custom-upload-button">Choose File</label>
        <input
          type="file"
          id="image-input"
          className="hidden-upload-button"
          accept=".png, .jpg, .jpeg"
          onChange={handleImageUpload}
        />
      </div>

      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      {uploading && (
        <div className="text-blue-500 mb-4">
          Processing image...
        </div>
      )}

      {analyzedBoard && (
        <div className="mt-4">
          <h2>Current Board:</h2>
          <img
            src={analyzedBoard}
            alt="Analyzed board"
            className="max-w-full h-auto mx-auto rounded-lg"
          />
        </div>
      )}
    </div>
  );
};

export default UploadContainer;