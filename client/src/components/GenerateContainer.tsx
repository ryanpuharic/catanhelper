import React, { useState, ChangeEvent } from 'react';
import '../App.css';

const checkboxesConfig = [
  { id: 'highCheckbox', name: 'highbool', label: "6 & 8 Don't Touch" },
  { id: 'lowCheckbox', name: 'lowbool', label: "2 & 12 Don't Touch" },
  { id: 'distCheckbox', name: 'distbool', label: "Fair Resource Distribution" },
  { id: 'sameNumbersCheckbox', name: 'sameNumbersbool', label: "Same Numbers Don't Touch" },
  { id: 'includePortsCheckbox', name: 'includePorts', label: "Include Ports" }
];

const GenerateContainer: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number>(2);

  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000' 
    : 'https://catanhelper-backend.onrender.com';

  // Utility to handle API requests
  const makeApiRequest = async (endpoint: string, queryParams: Record<string, string | number | boolean>) => {
    const query = new URLSearchParams(queryParams as Record<string, string>).toString();
    try {
      const response = await fetch(`${baseUrl}${endpoint}?${query}`, { method: 'GET' });
      if (!response.ok) {
        console.error(`API request to ${endpoint} failed.`);
      }
    } catch (error) {
      console.error('Failed to make API request:', error);
    }
  };

  const handleCheckboxChange = (name: string, value: boolean) => {
    makeApiRequest('/update_checkbox', { name, value });
  };

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    // setSliderValue(value);
    //makeApiRequest('/update_slider', { name: 'priority', value });
  };

  return (
    <div className="controls">
      <div className="gen-section">
        <h2>Generation Settings</h2>
        <form>
          {checkboxesConfig.slice(0, 4).map((checkbox) => (
            <div className="checkbox-container" key={checkbox.id}>
              <label htmlFor={checkbox.id}>{checkbox.label}</label>
              <input
                type="checkbox"
                className="checkbox"
                id={checkbox.id}
                name={checkbox.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleCheckboxChange(checkbox.name, e.target.checked)
                }
              />
            </div>
          ))}
        </form>
      </div>

      <div className="rank-section">
        <h2>Ranking Settings</h2>
        <form>
          <div className="slider-container">
            <div className="left-text">Dev Cards</div>
            <div className="right-text">Road Building</div>
          </div>
          <div className="slider-wrapper">
            <input
              type="range"
              id="slider"
              name="slider"
              className="slider"
              min="0"
              max="4"
              value={sliderValue}
              onChange={handleSliderChange}
            />
          </div>
          <div className="checkbox-container">
            <label htmlFor="includePortsCheckbox">Include Ports</label>
            <input
              type="checkbox"
              id="includePortsCheckbox"
              name="includePorts"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleCheckboxChange('includePorts', e.target.checked)
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateContainer;
