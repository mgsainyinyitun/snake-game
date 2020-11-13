import React from 'react';
import './GameOver.css';
const GameOver = props =>{
    console.log(props.gameOver);
    if(!props.gameOver){
        return null;
    }
    console.log("Game Over");
    return(
        <div className="game-over-msg">
            <h3>Game Over!</h3>
            <p>Your Snake lenght is {props.length} </p>
            <button className="restart-btn" onClick={props.onStart}>RESTART?</button>
        </div>
    )
}

export default GameOver;