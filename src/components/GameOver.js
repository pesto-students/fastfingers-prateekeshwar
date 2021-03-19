import React, {} from 'react';
import './style.css';
import PlayerConfig from "./PlayerConfig"
// import ScoreBoard from "./ScoreBoard"
// import Timer from "./Timer"
// import WordInput from "./WordInput"
import playAgain from '../assets/play-again/play-again.png';

export default function GameOver() {

    const handlePlayAgain = () => {
        window.location.pathname = "/game-console"
    }

    return (
    <div className="general-flex-direction-row">
        <div>
<PlayerConfig />
</div>
<div className="play-game-timer">
<div className="start-game-button" onClick={handlePlayAgain}  aria-hidden="true">
          <img src={playAgain} alt="play-img" className="play-again-icon"/>
            <input
              type="button"
              name="playAgain"
              id="playAgain"
              value="PLAY AGAIN"
            />
          </div>
</div>
    </div>
    )
}