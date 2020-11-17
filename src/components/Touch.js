import React from 'react';

class Touch extends React.Component{
    constructor(){
        //console.log('calling constructor');
        super();
        this.state = {
            start:{
                x:null,
                y:null
            },
            stop:{
                x:null,
                y:null
            }
        }
    }

    startTouch = (e)=>{
        const x = e.touches[0].clientX;
        const y = e.touches[0].clientY
        //console.log(x);
        //console.log(y);
        this.setState({
            start:{
                x:x,
                y:y
            }
        })
        //console.log(this.state.start);
    }
 
    endTouch = (e) =>{
        
        //console.log(e.changedTouches[0].clientX);
        this.setState({
            stop:{
                x:e.changedTouches[0].clientX,
                y:e.changedTouches[0].clientY
            }
        })

        this.detectDirection();
    }

    detectDirection = ()=>{
        const {start,stop} = this.state;
        if(stop.x === null && stop.y === null){
            return;
        }
        //console.log('startX:',start.x,'startY:',start.y);
        //console.log('stopX:',stop.x,'stopY:',stop.y);

        const max_diff = this.checkGreatDiff(start,stop);

        if(max_diff === "X"){
            this.runLorR(start.x,stop.x);
        }else{
            this.runUorD(start.y,stop.y);
        }
    }

    runLorR = (xstart,xstop)=>{
        const diff = xstart - xstop;
        if(diff > 0){
            console.log("LEFT");
            this.props.onTouch("LEFT")
        }else{
            console.log("RIGHT");
            this.props.onTouch("RIGHT");
        }
    }
    runUorD = (ystart,ystop)=>{
        const diff = ystart - ystop;
        if(diff >0){
            console.log("UP");
            this.props.onTouch("UP");
        }else{
            console.log("DOWN");
            this.props.onTouch("DOWN");
        }
    }

    checkGreatDiff= (start,stop) =>{
        const x_diff = Math.abs(start.x - stop.x);
        const y_diff = Math.abs(start.y - stop.x);
        
        if(x_diff >y_diff){
            return "X";
        }else{
            return "Y";
        }

    }
    render(){
        return(
            <div
                onTouchStart = {this.startTouch}
                onTouchEnd = {this.endTouch}
            >
                {this.props.children}
            </div>
        )
    }
}
export default Touch;