import React from 'react';

interface BoardGeneratorProps {
  setImagePath: (path: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

const BoardGenerator: React.FC<BoardGeneratorProps> = ({ setImagePath, setIsLoading }) => {
  const handleGenerateBoard = async () => {
    try {
      setIsLoading(true);
      
      // Use environment variables consistently
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5000' 
        : process.env.REACT_APP_API_BASE_URL;
  
      const response = await fetch(`${apiUrl}/generate_board`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate board');
      }
  
      const data = await response.json();
      
      // Use the full URL from backend response + cache busting
      if (data.image_url) {
        setImagePath(`${data.image_url}?t=${Date.now()}`);
      } else {
        throw new Error('No image URL in response');
      }
    } catch (error) {
      console.error('Failed to generate the board:', error);
      alert(error instanceof Error ? error.message : 'Unknown error occurred');
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