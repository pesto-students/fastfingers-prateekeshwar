import React, { useEffect, useState } from 'react';
import './style.css';

import getMaximumScoreObj from '../utility'

export default function ScoreBoard() {
  const [scoreList, setscoreList] = useState([]);
  const [newHighScore, setnewHighScore] = useState("");

  useEffect(() => {
      const storeList = JSON.parse(
        window.sessionStorage.getItem('scoreList') || '[{}]'
      )
      if (storeList.length) {
        const maxScoreObj = getMaximumScoreObj(storeList)
    setnewHighScore(maxScoreObj);
    setscoreList(
      JSON.parse(window.sessionStorage.getItem('scoreList') || '[]').filter(
        (obj) => Number(obj.id) !== Number(maxScoreObj.id)
      )
    );
}
  }, []);

  const content = scoreList.map(({ id, score }) => (
    <li key={id} className="individual-score general-font-design">
      <span className="">{`Game ${id} : ${score}`}</span>
    </li>
  ));

  return (
    <div className="score-board">
      <h4 className="score-box-heading">SCORE BOARD</h4>
      <ul>{content}</ul>
      <p className="persional-best general-font-design">PERSONAL BEST</p>
      {newHighScore ?<ul><li key={newHighScore.id} className="individual-score general-font-design">
        <span className="">
          {`Game ${newHighScore.id} : ${newHighScore.score}`}
        </span>
      </li> </ul> : null}
    </div>
  );
}
