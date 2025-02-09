import React from 'react';

interface BoardGeneratorProps {
  setImagePath: (path: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const BoardGenerator: React.FC<BoardGeneratorProps> = ({ setImagePath, setIsLoading }) => {
  const handleGenerateBoard = async () => {
    try {
      setIsLoading(true);
      const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.REACT_APP_API_BASE_URL;
      const response = await fetch('/generate_board', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to generate board');
      }

      const data = await response.json();
      setImagePath(`${baseUrl}/${data.image_path}?t=${Date.now()}`);
    } catch (error) {
      console.error('Failed to generate the board:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="group">
      <button className='generate-button' onClick={handleGenerateBoard}>Generate</button>
    </div>
  );
};

export default BoardGenerator;