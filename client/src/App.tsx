import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import ButtonContainer from './components/ButtonContainer';

const App: React.FC = () => {

  return (
    <div className="content">
      <Header />
      <div className="body-container">
        <ButtonContainer />
      </div>
    </div>
  );
};

export default App;
