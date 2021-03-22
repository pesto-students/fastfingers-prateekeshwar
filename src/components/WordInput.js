import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import './style.css';
import Timer from './Timer';
import wordArray from "../data/dictionary.json"

export default function WordInput({stopGame}) {
  const [difficultyLevel, setdifficultyLevel] = useState(window.sessionStorage.getItem("difficultyLevel"))
  const [difficultyFactor, setdifficultyFactor] = useState(JSON.parse(window.sessionStorage.getItem("difficultyFactor")))
  const [wordInput, setwordInput] = useState('');
  const [wordGiven, setwordGiven] = useState('WINDOW'.toUpperCase());
  const [timer, settimer] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [wordChange, setwordChange] = useState(false);

  const handleWordChange = () => {
    setwordChange(!wordChange)
  }

  const handleDifficultyLevelFactor = () => {
    if (difficultyFactor >= 1.5 && difficultyFactor < 2 && difficultyLevel !== 'MEDIUM') {
        setdifficultyLevel("MEDIUM")
        window.sessionStorage.setItem("difficultyLevel", "MEDIUM")
      }else if (difficultyFactor < 1.5 && difficultyLevel !== 'EASY') {
        setdifficultyLevel("EASY")
        window.sessionStorage.setItem("difficultyLevel", "EASY")
      } else if (difficultyFactor >= 2 && difficultyLevel !== 'HARD') {
        setdifficultyLevel("HARD")
        window.sessionStorage.setItem("difficultyLevel", "HARD")
      }
  }

  useEffect(()=>{
      handleDifficultyLevelFactor()
  }, [])

  const getRandomWord = () => {
      let filterWordArray;
      if (difficultyLevel === 'EASY') {
           filterWordArray = wordArray.filter((letter) => letter.length <= 4)
    } else if (difficultyLevel === 'MEDIUM') {
           filterWordArray = wordArray.filter((letter) => letter.length >= 5 && letter.length <= 8)
    } else {
         filterWordArray = wordArray.filter((letter) => letter.length > 8)
    }
    const randomWord = filterWordArray[Math.floor(Math.random() * filterWordArray.length)];
    setwordGiven(randomWord)
    if (Math.ceil(randomWord.length/difficultyFactor)*100 <= 1) {
        settimer(200)
        return;
    }
    settimer(Math.ceil(randomWord.length/difficultyFactor)*100)
    setwordChange(true);
  }


const handleClick = () => {
    if (!clicked) {
      setClicked(true);
    }
  };

  const handleChange = (event) => {
    setwordInput(event.target.value)
      if (event.target.value.toLowerCase() === wordGiven) {
        setwordInput("")
        setdifficultyFactor(prevDifficultyFactor => prevDifficultyFactor + 0.01)
        handleDifficultyLevelFactor()
        getRandomWord()
      }
  }

useEffect(() => {
    if (difficultyLevel === null || difficultyFactor === null) {
        window.location.pathname = '/'
    }
    getRandomWord()
}, [])

  const changeWordColor = wordGiven.split('').map((item, index) => {
    if (index < wordInput.length) {
      if (item === wordInput[index].toLowerCase()) {
        return (
          <p
            className="word general-margin-0"
            style={{ color: '#54ba18' }}
            key={index.toString()}
          >
            {item}
          </p>
        );
      }
      return (
        <p
          className="word general-margin-0"
          style={{ color: '#445298' }}
          key={index.toString()}
        >
          {item}
        </p>
      );
    }
    return (
      <p className="word general-margin-0" key={index.toString()}>
        {item}
      </p>
    );
  });

  return (
    <div className="play-game-timer">
      <Timer timer={timer} stopGame={stopGame} wordChange={wordChange} 
      handleWordChange={handleWordChange}/> 
      <div className="general-flex-direction-row">{changeWordColor}</div>
      <input
        className="enter-name general-font-design"
        type="text"
        name="enterWord"
        id="enterWord"
        value={wordInput}
        autoComplete="off"
        onClick={handleClick}
        onChange={handleChange}
      />
    </div>
  );
}


WordInput.propTypes = {
    stopGame: PropTypes.func.isRequired
  }