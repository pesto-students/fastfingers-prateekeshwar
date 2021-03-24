import React from "react";
import "./App.css";
import GameConsole from "./components/GameConsole"
import StartGame from "./components/StartGame"
import GameOver from "./components/GameOver"

function App() {
  const routeComponent = () => {
    if (window.location.pathname === '/') { return <StartGame /> }
    if (window.location.pathname === '/game-console'){ return <GameConsole /> }
    if (window.location.pathname === '/game-over'){return <GameOver />}
    return null;
  }

  return (
    <div className="App">
      {routeComponent()}
    </div>
  );
}

export default App;
