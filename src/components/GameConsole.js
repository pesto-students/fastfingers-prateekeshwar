import React from 'react';
import './style.css';
import GameConsoleWeb from './GameConsoleWeb'
import GameConsoleMobile from './GameConsoleMobile'

export default function GameConsole() {

  return (
    <>
    {window.innerWidth <= 470 ? <GameConsoleMobile/> : <GameConsoleWeb/> }
    </>
  );
}
