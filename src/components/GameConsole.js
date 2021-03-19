import React, {} from 'react';
import './style.css';
import PlayerConfig from "./PlayerConfig"
import ScoreBoard from "./ScoreBoard"
// import Timer from "./Timer"
import WordInput from "./WordInput"

export default function GameConsole() {
    return (
    <div className="general-flex-direction-row">
        <div>
<PlayerConfig />
<ScoreBoard />
</div>
<div>
<WordInput/>
</div>
    </div>
    )
}