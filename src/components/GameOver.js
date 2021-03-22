import React, { useEffect, useState } from 'react';
import './style.css';

import PlayerConfig from './PlayerConfig';
import getMaximumScoreObj from '../utility'
import playAgain from '../assets/play-again/play-again.png';

export default function GameOver() {
  const [gameCount] = useState(
    JSON.parse(window.sessionStorage.getItem('gameCount') || '0')
  );
  const [scoreList] = useState(
    JSON.parse(window.sessionStorage.getItem('scoreList') || '[]')
  );
  const [newHighScore, setnewHighScore] = useState('');

  useEffect(() => {
      if (scoreList.length) {
          const maxScoreObj = getMaximumScoreObj(scoreList)
    if (maxScoreObj.id === scoreList[scoreList.length - 1].id) {
      setnewHighScore(true);
    }}
  }, []);

  return (
    <div className="general-flex-direction-row genral-justify-content">
      <div className="general-flex-direction-column genral-justify-content">
        <PlayerConfig />
        <input
          className="quit-button"
          type="button"
          name="quit"
          id="quit"
          value="QUIT"
          onClick={()=> {window.location.pathname = '/'}}
        />
      </div>
      <div className="play-game-timer">
        <p className="game-over-game-count general-font-design-color">SCORE : GAME {gameCount}</p>
        <p className="score-value general-font-design-color">{scoreList.length ? scoreList[scoreList.length - 1].score : "0:00"}</p>
        {newHighScore ? <p className="new-high-score general-font-design">New High Score</p> : null}
        <div
          className="start-game-button"
          onClick={()=> {window.location.pathname = '/game-console'}}
          aria-hidden="true"
        >
          <img src={playAgain} alt="play-img" className="play-again-icon" />
          <input
            type="button"
            name="playAgain"
            id="playAgain"
            value="PLAY AGAIN"
          />
        </div>
      </div>
      <div>
        <p className="sub-heading-fast-finger general-font-design">fast fingers</p>
      </div>
    </div>
  );
}
