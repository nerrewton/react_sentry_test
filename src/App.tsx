import React from 'react';
import './App.css';

function App() {
  const handleClick = () => {
    throw new Error("Something went wrong !");
  }

  return <button onClick={ handleClick }>Break the world</button>
}

export default App;
