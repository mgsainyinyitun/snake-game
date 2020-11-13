import React from 'react';
import './StatusCard.css';

const StatusCard = (props) =>{
    const velocity = Math.floor((2/props.speed)*1000);
    return(
        <div className="status-card">
            <p className="info">LENGTH :: {props.length} </p>
            <p className="info">SPEED :: {velocity} pixel / sec</p>
        </div>
    )
}

export default StatusCard;