import React from 'react';
import './App.css';

import Snake from './Snake';
import Food from './Food';
import GameOver from'./GameOver';
import StartMessage from './StartMessage';
import StatusCard from './StatusCard';
import Touch from './Touch';

import Particles from 'react-particles-js';

const parameter = {
    particles:{
        number:{
            value:300,
            density:{
                enable:true,
                value_area:800
            }
        }
    },
    color:{
        value:"#FF000"
    },
    interactivity:{
        detect_on:"window",
        events:{
            onhover:{
                enable:true,
                mode:'repulse'
            }
        }
    }


}



const getRandomCoordinate = ()=>{
    let min = 1;
    let max = 96;
    let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    return [x,y]

}

const initialState = {
    foodDot:getRandomCoordinate(),
    gameOver:false,
    start:false,
    speed:200,
    direction:'RIGHT',
    snakeDots:[
        [2,2],
        [4,2]
    ]
}

export default class App extends React.Component{
    
    constructor(){
        //console.log("I am constructor")
        super();
        this.state = initialState;
        this.interval = null;
        this.final_length = 0;
    }
    componentWillUnmount
    comp
    componentDidUpdate
    componentDidMount(){
        //this.interval = setInterval(this.moveSnake,this.state.speed);
        document.onkeydown = this.onKeyDown;

    }

    componentDidUpdate(){
        this.checkOutOfBorder();
        this.checkHitSelf();
        this.checkEatFood();
    }

    onTouch = (direction)=>{
        switch(direction){
            case 'RIGHT': this.setState({direction:'RIGHT'});break;
            case 'LEFT': this.setState({direction:'LEFT'});break;
            case 'DOWN':this.setState({direction:'DOWN'});break;
            case 'UP':this.setState({direction:'UP'});break;
            default:break; 
        }
    }

    onKeyDown = (e) => {
        e.preventDefault();
        e = e|| window.event;
        switch(e.keyCode){
            case 38: this.setState({direction:'UP'});break;
            case 40: this.setState({direction:'DOWN'});break;
            case 37: this.setState({direction:'LEFT'});break;
            case 39: this.setState({direction:'RIGHT'});break;
            default: break;
        }
    }




    moveSnake =()=> {
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length-1];

        switch(this.state.direction){
            case 'RIGHT': head = [head[0]+2, head[1]];break;
            case 'LEFT': head = [head[0]-2,head[1]];break;
            case 'DOWN':head = [head[0],head[1]+2];break;
            case 'UP':head = [head[0],head[1]-2];break;
            default:break; 
        }
        dots.push(head); // move head base on direction /\
        dots.shift(); // remove first array (tail)
        this.setState({
            snakeDots:dots
        });
    }

    checkOutOfBorder = () =>{
        let head = this.state.snakeDots[this.state.snakeDots.length-1];
        if (head[0] >= 100 || head[1] >=100 || head[0]<0 || head[1]<0){
            this.onGameOver();
        }
    }
    checkHitSelf = () =>{
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length-1];
        snake.pop();
        snake.forEach(dot =>{
            if(head[0] === dot[0] && head[1] === dot[1]){
                this.onGameOver();
            }
        })
    }

    checkEatFood = ()=>{
        let head = this.state.snakeDots[this.state.snakeDots.length-1];
        let food = this.state.foodDot;
        
        if(head[0] === food[0] && head[1] === food[1]){
            this.setState({
                foodDot:getRandomCoordinate()
            })
            this.enlargeSnake();
            this.increaseSpeed();
            this.final_length= this.state.snakeDots.length+1;
        }
    }
    enlargeSnake  = () =>{
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([]);
        this.setState({
            snakeDots:newSnake
        })
    }

    increaseSpeed = () =>{
        let currentSpeed = this.state.speed;
        if(currentSpeed>10){
            this.setState({
                speed:currentSpeed-10,
            })
        }else{
        }
    }


    onGameOver= ()=> {
        //alert(`Game Over. Snake's length is ${this.state.snakeDots.length}`);
        this.setState(initialState);
        this.setState({
            start:true,
            gameOver:true
        })
        this.stop();
    }

    onStart = ()=>{
        this.setState({
            start:true,
            gameOver:false
        });
        this.interval = setInterval(this.moveSnake,this.state.speed);
        this.final_length=0;
    }

    stop = () =>{
        clearInterval(this.interval);
    }

   startTouch = (e)=>{
       console.log(e.touches[0].clientX);
   }

   endTouch = (e) =>{
       console.log(e.changedTouches[0].clientX);
   }

    render(){
        return(
            
            <div>
                <Particles className='ani-bkg' params={parameter}/>
                <StatusCard
                    speed = {this.state.speed}
                    length = {this.final_length}
                /> 
                <p className="naming">This Game is Created By - Sai Nyi</p> 
            
            <Touch onTouch = {this.onTouch}>
            <div className='game-area'>
                <StartMessage 
                    start={this.state.start}
                    onStart ={this.onStart}
                />
                <GameOver
                    gameOver = {this.state.gameOver}
                    onStart={this.onStart}
                    length={this.final_length}
                />
                <Snake 
                    snakeDots = {this.state.snakeDots}
                />
                <Food dot={this.state.foodDot}/>
            </div>
            </Touch>
            </div>
        );
    }
}