import React from 'react';
import './StatusCard.css';

const StatusCard = (props) =>{
    const velocity = (2/props.speed)*1000;
    return(
        <div className="status-card">
            <h5>LENGTH :: {props.length} </h5>
            <h5>SPEED :: {velocity} pixel / sec</h5>
        </div>
    )
}

export default StatusCard;