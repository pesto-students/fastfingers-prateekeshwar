import React from 'react';
import './style.css';
import gameIcon from '../assets/game-icon/game-icon.png';
import userIcon from '../assets/user-icon/user-icon.png';

export default function PlayerConfig() {
  return (
    <div className="general-flex-direction-column">
        <div className="general-flex-direction-row">
            <img src={userIcon} className="icon" alt="user-icon"/>
      <h3 className="player-name-level">{window.sessionStorage.getItem('playerName')}</h3>
      </div>
      <div className="general-flex-direction-row">
      <img src={gameIcon} alt="game-icon" className="icon"/>
      <h3 className="player-name-level">LEVEL : {window.sessionStorage.getItem('difficultyLevel')}</h3>
      </div>
    </div>
  );
}
