import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import MainRoute from './router';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <MainRoute/>
        </div>
    </BrowserRouter>
    );
  }
}

export default App;