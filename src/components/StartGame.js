import React, { useState } from 'react';
import './style.css';
import keyboardImage from '../assets/keyboard-image/keyboard-image.png';
import playGame from '../assets/start-game-play/start-game-play.png';

export default function StartGame() {
  const [difficultyLevel, setdifficultyLevel] = useState(
    window.sessionStorage.getItem('difficultyLevel') || 'EASY'
  );
  const [difficultyFactor, setdifficultyFactor] = useState(
    window.sessionStorage.getItem('difficultyFactor') || 1
  );
  const [openDropDown, setopenDropDown] = useState(false);
  const [playerName, setplayerName] = useState(
    window.sessionStorage.getItem('playerName') || ''
  );
  const [error, setError] = useState('');

  const handleDropDownValue = (event) => {
    setdifficultyFactor(event.target.name);
    setdifficultyLevel(event.target.value);
    setopenDropDown(!openDropDown);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!playerName) {
      setError('Please provide a player name');
      return;
    }
    if (window.sessionStorage.getItem('playerName') !== playerName) {
      window.sessionStorage.setItem('playerName', playerName);
    }
    if (window.sessionStorage.getItem('difficultyLevel') !== difficultyLevel) {
      window.sessionStorage.setItem('difficultyLevel', difficultyLevel);
    }
    if (
      window.sessionStorage.getItem('difficultyFactor') !== difficultyFactor
    ) {
      window.sessionStorage.setItem('difficultyFactor', difficultyFactor);
    }
    if (!window.sessionStorage.getItem('gameCount')) {
      window.sessionStorage.setItem('gameCount', 0);
    }
    if (!window.sessionStorage.getItem('scoreList')) {
      window.sessionStorage.setItem('scoreList', JSON.stringify([]));
    }
    window.location.pathname = '/game-console';
  };

  return (
    <div
      className="start-game"
      onClick={() => {
        if (openDropDown) {
          setopenDropDown(false);
        }
      }}
      aria-hidden="true"
    >
      <img src={keyboardImage} alt="img" className="keyboard-class" />
      <h3 className="heading general-font-design">fast fingers</h3>
      <div className="start-game-content">
        <p className="line" />
        <p className="game-detail">the ultimate typing game</p>
        <p className="line" />
      </div>
      <form>
        <div className="enter-name-div">
          <input
            className="enter-name general-font-design"
            type="text"
            name="enterName"
            style={error ? { 'box-shadow': '0px 42px 0px 0px red' } : null}
            id="enterName"
            placeholder="type your name"
            autoComplete="off"
            value={playerName}
            onChange={(event) => {
              setError('');
              setplayerName(event.target.value);
              window.sessionStorage.setItem('playerName', event.target.value);
            }}
          />
          {error ? (
            <p className="error-alignment">
              <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <title>Layer 1</title>
                  <circle fill="#ffffff" r="16" id="BG" cy="16" cx="16" />
                  <path
                    fill="#d72828"
                    id="Exclamatory_x5F_Sign"
                    d="m14.5,25l3,0l0,-3l-3,0l0,3zm0,-19l0,13l3,0l0,-13l-3,0z"
                  />
                </g>
              </svg>
              <span className="error">{error}</span>
            </p>
          ) : null}
        </div>

        <div className="difficulty-drop-down-div">
          <input
            id="level"
            name="level"
            type="button"
            onClick={() => setopenDropDown(!openDropDown)}
            className="dropdown general-font-design"
            value={difficultyLevel}
          />
          {openDropDown ? (
            <div className="dropdown-menu dropdown-menu-width">
              <input
                type="button"
                className={`${
                  difficultyLevel === 'EASY'
                    ? 'selected-dropdown selected-dropdown-width'
                    : 'dropdown-content'
                } general-font-design`}
                value="EASY"
                name={1}
                onClick={handleDropDownValue}
              />
              <input
                type="button"
                className={`${
                  difficultyLevel === 'MEDIUM'
                    ? 'selected-dropdown selected-dropdown-width'
                    : 'dropdown-content'
                } general-font-design`}
                value="MEDIUM"
                name={1.5}
                onClick={handleDropDownValue}
              />
              <input
                type="button"
                className={`${
                  difficultyLevel === 'HARD'
                    ? 'selected-dropdown selected-dropdown-width'
                    : 'dropdown-content'
                } general-font-design`}
                value="HARD"
                name={2}
                onClick={handleDropDownValue}
              />
            </div>
          ) : null}
        </div>
        <div
          className="start-game-button"
          onClick={handleSubmit}
          aria-hidden="true"
        >
          <img src={playGame} alt="play-img" className="play-icon" />
          <input
            className="input-margin-font-size-game-start"
            type="submit"
            name="startGame"
            id="startGame"
            value="start game"
          />
        </div>
      </form>
    </div>
  );
}
