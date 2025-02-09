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
  const [sliderValue, setSliderValue] = useState<number>(2); // Default value for the slider

  const baseUrl = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:5000' 
  : process.env.REACT_APP_API_BASE_URL;

  const updateCheckbox = (name: string, value: boolean) => {
    fetch(`${baseUrl}/update_checkbox?name=${name}&value=${value}`, { method: 'GET' });
  };

  const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setSliderValue(value);
    fetch(`${baseUrl}/update_slider?name=priority&value=${value}`, { method: 'GET' });
  };

  return (
    <div className = "controls">
      <div className="gen-section">
        <h2>Generation Settings</h2>
        <form>
          {checkboxesConfig.slice(0, 4).map((checkbox) => (
            <div className="checkbox-container" key={checkbox.id}>
              <label htmlFor={checkbox.id}>{checkbox.label}</label>
              <input
                type="checkbox"
                className = "checkbox"
                id={checkbox.id}
                name={checkbox.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => updateCheckbox(checkbox.name, e.target.checked)}
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => updateCheckbox('includePorts', e.target.checked)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GenerateContainer;
