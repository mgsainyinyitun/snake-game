import React from 'react';
import './StartMessage.css';
const StartMessage = (props)=>{
    //console.log(props.start);
    if(props.start){
        return null;
    }

    return(
        <div className="start-message">
            <h3>START?</h3>
            <button className="yes-btn" onClick={props.onStart}>YES</button>
        </div>
    )
}

export default StartMessage;