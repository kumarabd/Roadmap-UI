import React from 'react';
import './App.css';
import './NavBar';
import AppBar from './NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';
import Map from './Map';

function App() {
  return (
    <div className="App">
      <AppBar/>
      <Map/>
    </div>
  );
}

export default App;
