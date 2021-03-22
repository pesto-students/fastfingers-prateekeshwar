import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import PlayerConfig from './PlayerConfig';
import ScoreBoard from './ScoreBoard';
import WordInput from './WordInput';
import stopGameIcon from '../assets/stop-game-icon/stop-game-icon.png';

export default function GameConsole() {
  const [gameCount] = useState(
    JSON.parse(window.sessionStorage.getItem('gameCount'))
  );
  const [scoreList] = useState(
    JSON.parse(window.sessionStorage.getItem('scoreList'))
  );
  const [second, setsecond] = useState(0);
  const [minute, setminute] = useState(0);
  const secondRef = useRef(second);
  const minuteRef = useRef(minute);
  secondRef.current = second;
  minuteRef.current = minute;

  const stopGame = () => {
    window.sessionStorage.setItem('gameCount', gameCount + 1);
    window.sessionStorage.setItem(
      'scoreList',
      JSON.stringify([
        ...scoreList,
        ...[
          {
            id: gameCount + 1,
            score: `${minuteRef.current < 10 ? `0${minuteRef.current}` : minuteRef.current}:${
                secondRef.current < 10 ? `0${secondRef.current}` : secondRef.current
            }`,
          },
        ],
      ])
    );
    window.location.pathname = '/game-over';
  };

  useEffect(() => {
    const updateLevel = setInterval(() => {
      if (secondRef.current >= 60) {
        setsecond(0);
        setminute(minuteRef.current + 1);
      } else {
        setsecond(secondRef.current + 1);
      }
    }, 1000);
    return () => {
      clearTimeout(updateLevel);
    };
  }, []);

  return (
    <div
      className="general-flex-direction-row"
      style={{ justifyContent: 'space-between' }}
    >
      <div>
        <PlayerConfig />
        <ScoreBoard />
        <div
          className="start-game-button"
          style={{ marginTop: '40px' }}
          onClick={stopGame}
          aria-hidden="true"
        >
          <img src={stopGameIcon} alt="play-img" className="stop-game-icon" />
          <input
            type="button"
            name="stopGame"
            id="stopGame"
            value="STOP GAME"
          />
        </div>
      </div>
      <div>
        <WordInput stopGame={stopGame}/>
      </div>
      <div className="general-flex-direction-column">
        <p className="sub-heading-fast-finger general-font-design">fast fingers</p>
        <p className="score-count general-font-design">{`SCORE: ${
          minute < 10 ? `0${minute}` : minute
        }:${second < 10 ? `0${second}` : second}`}</p>
      </div>
    </div>
  );
}
