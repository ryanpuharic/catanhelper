import React from 'react';

interface BoardGeneratorProps {
  setImagePath: (path: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const BoardGenerator: React.FC<BoardGeneratorProps> = ({ setImagePath, setIsLoading }) => {
  const handleGenerateBoard = async () => {
    try {
      setIsLoading(true);

      const apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000' 
        : 'https://catanhelper-backend.onrender.com';

      const response = await fetch(`${apiUrl}/generate_board`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        let errorMessage = 'Failed to generate board';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      if (data.image_url) {
        setImagePath(`${data.image_url}?t=${Date.now()}`); // Cache busting for fresh images
      } else {
        throw new Error('No image URL in response');
      }
    } catch (error) {
      console.error('Failed to generate the board:', error);
      alert(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group">
      <button className="generate-button" onClick={handleGenerateBoard}>
        Generate
      </button>
    </div>
  );
};

export default BoardGenerator;