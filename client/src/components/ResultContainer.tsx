import React from 'react';
import '../App.css';

interface ResultContainerProps {
  imagePath: string | null;
  isLoading: boolean;
}

const ResultContainer: React.FC<ResultContainerProps> = ({ imagePath, isLoading }) => (
  <div className="img-container">
    <div id="result-container">
      {isLoading ? (
        <div>
          <h2>Current Board:</h2>
          <h3>Loading...</h3>
        </div>
      ) : imagePath ? (
        <div>
          <h2>Current Board:</h2>
          <img
            src={imagePath}
            alt="Generated Board"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      ) : null}
    </div>
  </div>
);

export default ResultContainer;