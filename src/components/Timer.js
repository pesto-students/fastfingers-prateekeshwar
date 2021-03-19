import React, { useEffect, useState, useRef } from 'react';
import PropTypes from "prop-types";
import './style.css';

export default function Timer({timer, startGame, wordMatch}) {

    const [time,  settime] = useState(timer)
    const [currTimer, setcurrTimer] = useState(timer)
    const [gameCount] = useState(JSON.parse(window.sessionStorage.getItem("gameCount")))
    const [scoreList] = useState(JSON.parse(window.sessionStorage.getItem("scoreList")))
    const countRef = useRef(time);
    const wordMatchedRef = useRef(wordMatch);
    wordMatchedRef.current = wordMatch;
    countRef.current = time;

    useEffect(()=> {
        if (startGame) {
        if (currTimer !== timer) {
            settime(timer)
            setcurrTimer(timer)
        const interval = setInterval(() => {
                      if (wordMatchedRef.current) {
                clearInterval(interval);
              window.sessionStorage.setItem("gameCount", gameCount + 1)
              window.sessionStorage.setItem("scoreList", JSON.stringify([...scoreList,
                ...[{id:gameCount+1, score:((timer-countRef.current)/100).toFixed(2).replace(/\./g, ':') }]]))
              window.location.reload();
                  return;
            }
            const currCount = countRef.current;
            if (currCount <= 0) {
            clearInterval(interval);
            window.location.pathname = '/game-console'
            return;
            }
            settime(currCount -1)
          }, 10);
        }
    }
    })

    const getTimerFormat = () => {
        if (!startGame) {
            return timer === 0 ? "0:00" : (timer/100).toFixed(2).replace(/\./g, ':') 
        }
        return (time/100).toFixed(2).replace(/\./g, ':')
    }

  return (
    <div className="timer-circle">
        <p className="timer">{getTimerFormat()}</p>
    </div>
  );
}

Timer.propTypes = {
    timer: PropTypes.number.isRequired,
    startGame: PropTypes.bool.isRequired,
    wordMatch: PropTypes.bool.isRequired
  }
  