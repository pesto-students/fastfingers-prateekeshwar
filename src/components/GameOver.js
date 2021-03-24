import React, { useEffect, useState, useRef } from 'react';
import './style.css';

import PlayerConfig from './PlayerConfig';
import getMaximumScoreObj from '../utility';
import playAgain from '../assets/play-again/play-again.png';

export default function GameOver() {
  const [gameCount] = useState(
    JSON.parse(window.sessionStorage.getItem('gameCount') || '0')
  );
  const [scoreList] = useState(
    JSON.parse(window.sessionStorage.getItem('scoreList') || '[]')
  );
  const [newHighScore, setnewHighScore] = useState('');
  const [timer, settimer] = useState(5);
  const countRef = useRef(timer);
  countRef.current = timer;

  useEffect(() => {
    const autoPlayInterval = setInterval(() => {
      if (countRef.current <= 1) {
        clearInterval(autoPlayInterval);
        window.location.pathname = '/game-console';
      }
      settimer(countRef.current - 1);
    }, 1000);
    if (scoreList.length) {
      const maxScoreObj = getMaximumScoreObj(scoreList);
      if (maxScoreObj.id === scoreList[scoreList.length - 1].id) {
        setnewHighScore(true);
      }
    }
  }, []);

  return (
    <div className="general-flex-direction-column align-game-over">
      <div className="general-flex-direction-row genral-justify-content">
        <PlayerConfig />
        <div>
          <p className="sub-heading-fast-finger general-font-design">
            fast fingers
          </p>
        </div>
      </div>
      <div className="play-game-timer">
        <p className="game-over-game-count general-font-design-color">
          SCORE : GAME {gameCount}
        </p>
        <p className="score-value general-font-design-color">
          {scoreList.length ? scoreList[scoreList.length - 1].score : '0:00'}
        </p>
        {newHighScore ? (
          <p className="new-high-score general-font-design">New High Score</p>
        ) : null}
        <div
          className="start-game-button start-game-button-margin-game-over"
          onClick={() => {
            window.location.pathname = '/game-console';
          }}
          aria-hidden="true"
        >
          <img src={playAgain} alt="play-img" className="play-again-icon" />
          <input
            className="input-margin-font-size-game-over"
            type="button"
            name="playAgain"
            id="playAgain"
            value="PLAY AGAIN"
          />
        </div>
        <p className="game-over-continue">Game will continue in {timer}</p>
      </div>
      <div>
        <input
          className="quit-button"
          type="button"
          name="quit"
          id="quit"
          value="QUIT"
          onClick={() => {
            window.location.pathname = '/';
          }}
        />
      </div>
    </div>
  );
}
