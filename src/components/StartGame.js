import React, {useState} from 'react';
import './style.css';
import keyboardImage from '../assets/keyboard-image/keyboard-image.png';
import playGame from '../assets/start-game-play/start-game-play.png';

export default function StartGame() {

  const [difficultyLevel, setdifficultyLevel] = useState(window.sessionStorage.getItem("difficultyLevel") || 'difficulty level')
  const [difficultyFactor, setdifficultyFactor] = useState(window.sessionStorage.getItem("difficultyFactor") || 1)
  const [openDropDown, setopenDropDown] = useState(false)
  const [playerName, setplayerName] = useState(window.sessionStorage.getItem("playerName") || "")
  const [error, setError] = useState("")

  const handleDropDownValue = (event) => {
    setdifficultyFactor(event.target.name)
    setdifficultyLevel(event.target.value)
    setopenDropDown(!openDropDown)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!playerName) { setError("Player name cannot be empty"); return;}
    if (window.sessionStorage.getItem("playerName") !== playerName) {
      window.sessionStorage.setItem("playerName", playerName);
    }
    if (window.sessionStorage.getItem("difficultyLevel") !== difficultyLevel) {
      window.sessionStorage.setItem("difficultyLevel", difficultyLevel === 'difficulty level' ? "EASY": difficultyLevel);
    }
    if (window.sessionStorage.getItem("difficultyFactor") !== difficultyFactor) {
      window.sessionStorage.setItem("difficultyFactor", difficultyFactor);
    }
    if (!window.sessionStorage.getItem("gameCount")) {
      window.sessionStorage.setItem("gameCount", 0)
    }
    if (!window.sessionStorage.getItem("scoreList")) {
      window.sessionStorage.setItem("scoreList", JSON.stringify([]))
    }
    window.location.pathname = '/game-console'
  }

    return (
      <div className="start-game" onClick={() => {if (openDropDown) {setopenDropDown(false)}}} aria-hidden="true">
        <img src={keyboardImage} alt="img" className="keyboard-class" />
        <h3 className="heading">fast fingers</h3>
        <div className="start-game-content">
          <p className="line" />
          <p className="game-detail">the ultimate typing game</p>
          <p className="line" />
        </div>
        <form onSubmit={handleSubmit}
        >
          <div>
            <input
              className="enter-name"
              type="text"
              name="enterName"
              id="enterName"
              placeholder="type your name"
              autoComplete="off"
              value={playerName}
              onChange={(event) => setplayerName(event.target.value)}
            />
          </div>

          <div style={{"height": "165px"}}>
            <button id="level" name="level"  type="button" onClick={() => setopenDropDown(!openDropDown)} className="dropdown">{difficultyLevel}</button>
            {openDropDown ? <div className="dropdown-menu">
            <button type="button" className={difficultyLevel === 'EASY' ? "selected-dropdown" :"dropdown-content"} value="EASY" name={1} onClick={handleDropDownValue}>easy</button>
            <button type="button" className={difficultyLevel === 'MEDIUM' ? "selected-dropdown" :"dropdown-content"} value="MEDIUM" name={1.5} onClick={handleDropDownValue}>medium</button>
            <button type="button" className={difficultyLevel === 'HARD' ? "selected-dropdown" :"dropdown-content"} value="HARD" name={2} onClick={handleDropDownValue}>hard</button>
            </div>: null}
          </div>
          {error ? <span style={{color:"red"}}>{error}</span> : null}
          <div className="start-game-button">
          <img src={playGame} alt="play-img" className=""/>
            <input
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
