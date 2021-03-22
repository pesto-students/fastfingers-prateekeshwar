import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function Timer({
  timer,
  wordChange,
  handleWordChange,
  stopGame,
}) {
  const [time, settime] = useState(timer);
  const [currInterval, setcurrInterval] = useState('');
  const [circleDashArray, setcircleDashArray] = useState('283, 283');
  const countRef = useRef(time);
  countRef.current = time;
  const countarr = useRef(circleDashArray);
  countarr.current = circleDashArray;

  useEffect(() => {
    if (wordChange) {
      clearTimeout(currInterval);
      setcircleDashArray('283, 283');
      settime(timer);
      handleWordChange();
      const interval = setInterval(() => {
        const currCount = countRef.current;
        if (currCount <= 0) {
          setcircleDashArray('283, 283');
          clearInterval(interval);
          stopGame();
          return;
        }
        const fraction = (currCount-1)/timer;
        const circleDashArr = `${(
            fraction * 283
        ).toFixed(0)}, 283`;
        setcircleDashArray(circleDashArr);
        settime(currCount - 1);
      }, 10);
      setcurrInterval(interval);
    }
  });

  return (
    <div className="timer-circle">
      <svg
        className="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="base-timer__circle">
          <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
          <path
            id="base-timer-path-remaining"
            strokeDasharray={circleDashArray}
            className="base-timer__path-remaining"
            d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
          />
        </g>
      </svg>
      <p className="timer">{(time / 100).toFixed(2).replace(/\./g, ':')}</p>
    </div>
  );
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  wordChange: PropTypes.bool.isRequired,
  handleWordChange: PropTypes.func.isRequired,
  stopGame: PropTypes.func.isRequired,
};
