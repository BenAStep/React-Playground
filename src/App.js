import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import IdleGame from './idleGame/idleGame.js'
import Quiz from './quiz/quiz.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Quiz></Quiz>
      </div>
    );
  }
}

export default App;
