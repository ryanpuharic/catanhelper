import React, { useState } from 'react';
import GenerateContainer from './GenerateContainer';
import UploadContainer from './UploadContainer';
import BoardGenerator from './BoardGenerator';
import ResultContainer from './ResultContainer';

const ButtonContainer = () => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [imagePath, setImagePath] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };

  return (
    <div className="button-container">
      <div className="button-group">
        <button
          className={`board-button ${activeButton === 'generate' ? 'active' : ''}`}
          onClick={() => handleButtonClick('generate')}
        >
          Generate Board
        </button>
        <div className="or">or</div>
        <button
          className={`board-button ${activeButton === 'upload' ? 'active' : ''}`}
          onClick={() => handleButtonClick('upload')}
        >
          &nbsp;&nbsp;Upload Board&nbsp;&nbsp;
        </button>
      </div>

      <div className="container-content">
        {activeButton === 'generate' && (
          <>
            <div className = "gen-tools">
              <GenerateContainer />
              <BoardGenerator setImagePath={setImagePath} setIsLoading={setIsLoading} />
            </div>
            <ResultContainer imagePath={imagePath} isLoading={isLoading} />
          </>
        )}

        {activeButton === 'upload' && (
          <>
            <UploadContainer />
          </>
        )}
      </div>

    </div>
  );
};

export default ButtonContainer;
