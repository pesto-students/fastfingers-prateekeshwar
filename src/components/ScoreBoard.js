import React from 'react';
import './style.css';

export default function ScoreBoard() {

const content = JSON.parse(window.sessionStorage.getItem("scoreList")).map(({ id, score }) => 
         (
          <li key={id} className="individual-score">
            <span className="">
              {`Game ${id} : ${score}`}
            </span>
          </li>
        )
)

  return (
    <div className="score-board">
    <h4 className="score-box-heading">SCORE BOARD</h4>
    <ul>{content}</ul>
    </div>
  );
}