import React, { Component } from 'react';
import wheat from './wheat.svg';
import pause from './pause-button.svg';
import play from './play-button.svg';

import './idleGame.css'

class IdleGame extends Component {
    constructor(props){
        super(props);

        this.state = {
            pause: false,
            food: 0,
            farmHand: 0,
            farmHandCost: 30,
            farmer: 0,
            farmerCost: 100,
        }

        this.handlePause = this.handlePause.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFarmHandClick = this.handleFarmHandClick.bind(this);
        this.handleFarmerClick = this.handleFarmerClick.bind(this);
    }

    handlePause(e){
        e.preventDefault();
        this.setState(prevState => ({
            pause: !prevState.pause,
        }))
    }

    handleClick(e){
        e.preventDefault();
        if(this.state.pause){
            return;
        }
        this.setState(prevState => ({
            food: prevState.food + 1 + (1 * prevState.farmHand),
        }));
    }

    handleFarmHandClick(e){
        e.preventDefault();
        if(this.state.pause){
            return;
        }
        if(this.state.food < this.state.farmHandCost){
            return;
        }
        this.setState(prevState => ({
            food: prevState.food - prevState.farmHandCost,
            farmHand: prevState.farmHand + 1,
            farmHandCost: prevState.farmHandCost + 5,
        }));
    }

    handleFarmerClick(e){
        e.preventDefault();
        if(this.state.pause){
            return;
        }
        if(this.state.food < this.state.farmerCost){
            return;
        }
        this.setState(prevState => ({
            food: prevState.food - prevState.farmerCost,
            farmer: prevState.farmer + 1,
            farmerCost: prevState.farmerCost + 50,
        }));
    }

    tick(){
        if(this.state.pause){
            return;
        }
        this.setState(prevState => ({
            food: prevState.food + (prevState.farmer * 0.5),
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 50); // 20 Ticks per second
      }
    
    componentWillUnmount() {
        clearInterval(this.interval);
      }
    
    render() {
        return (
          <div className="game-holder">
            <div className="row">
                <div className="col-md-4">
                    <p>Food<img src={wheat} className="icon-store" align="middle" alt="Food" />: {this.state.food}</p>
                </div>
                <div className="col-md-4">
                    <span className='btn btn-primary' id='writeCode' onClick={this.handleClick}>Grow some food</span>
                    <span className='btn btn-primary' id='upgradeKeyboard' onClick={this.handleFarmHandClick}>Add a farm hand
                        <span className={this.state.food < this.state.farmHandCost ? "badge badge-danger badge-pill" : "badge badge-success badge-pill"}>
                        {this.state.farmHandCost}<img src={wheat} className="icon-badge" align="middle" alt="Food" />
                        </span>
                    </span>
                    <span className='btn btn-primary' id='upgradeKeyboard' onClick={this.handleFarmerClick}>Add a farmer
                        <span className={this.state.food < this.state.farmerCost ? "badge badge-danger badge-pill" : "badge badge-success badge-pill"}>
                        {this.state.farmerCost}<img src={wheat} className="icon-badge" align="middle" alt="Food" />
                        </span>
                    </span>
                </div>
                <div className="col-md-4">
                    <span className='btn btn-primary' id='writeCode' onClick={this.handlePause}>{ this.state.pause ? "Continue" : "Pause" }<img src={this.state.pause ? play : pause} className='icon-badge' alt={this.state.pause ? "Play" : "Pause"} /></span>
                </div>
            </div>
          </div>
        );
      }
}

export default IdleGame