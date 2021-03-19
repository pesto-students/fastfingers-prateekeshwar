import React, { useState, useEffect } from 'react';
import './style.css';
import Timer from './Timer';
import wordArray from "../data/dictionary.json"

export default function WordInput() {
  const [difficultyLevel] = useState(window.sessionStorage.getItem("difficultyLevel"))
  const [difficultyFactor] = useState(window.sessionStorage.getItem("difficultyFactor"))
  const [wordInput, setwordInput] = useState('');
  const [wordGiven, setwordGiven] = useState('WINDOW'.toUpperCase());
  const [timer, settimer] = useState(0);
  const [clicked, setClicked] = useState(false);
  const [WordMatch, setWordMatch] = useState(false);

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
    settimer(Math.ceil(randomWord.length/difficultyFactor)*100)
  }


const handleClick = () => {
    if (!clicked) {
      setClicked(true);
    }
  };

  const handleChange = (event) => {
    setwordInput(event.target.value)
      if (event.target.value.toLowerCase() === wordGiven) {
          setWordMatch(true)
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
      <Timer timer={timer} startGame={clicked} wordMatch={WordMatch}/> 
      <div className="general-flex-direction-row">{changeWordColor}</div>
      <input
        className="enter-name"
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
