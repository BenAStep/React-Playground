import React, { Component } from 'react';
import $ from 'jquery'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './quiz.css'

class Quiz extends Component{
    constructor(props){
        super(props);

        var sec = 180;
        var board = [{
           group: ["A","B","C","D"],
           connection: "Letters",
           found: false,
        },
        {
            group: ["1","2","3","4"],
            connection: "Numbers",
            found: false,
         },
         {
            group: ["Bulbasaur","Charmander","Squirtle","Pikachu"],
            connection: "Comparisons",
            found: false,
         },
         {
            group: ["[","]","(",")"],
            connection: "Brackets",
            found: false,
         }]

        var groupA = [];
        var items = groupA.concat(board[0].group, board[1].group, board[2].group, board[3].group).sort(function() { return 0.5 - Math.random() });

        this.state = {
            timeRemaining: (20 * sec),
            board: board,
            selected: [],
            items: items,
            solved: [],
            trysRemaining: 3,
        };

        this.selectItem = this.selectItem.bind(this);
    }

    render(){
        var timePercent = ((this.state.timeRemaining / 3600) * 100);
        var style = {width: timePercent + "%"}
        return (
            <div className="container">
                <br/>
                <div className="row">
                {this.state.items.map(item => { 
                    var classes = 'text-center jumbotron';
                    if($.inArray(item, this.state.selected) !== -1){
                        classes = classes + ' selected';
                    }
                    $.each(this.state.solved, (i, el) => {
                        if(el.indexOf(item) !== -1){
                            classes = classes + ' solved-' + i;
                        }
                    });
                    return (
                            <div className="col-sm-3" key={item}>
                                <div className={classes} onClick={this.selectItem}>
                                    {item}
                                </div></div>
                            )
                    })}
                </div>
                <br/>
                <div className="row">
                    <div className="col-sm-10">
                    <div className="progress">
                        <div className="progress-bar" role="progressbar" aria-valuenow={timePercent}
                                aria-valuemin="0" aria-valuemax="100" style={style}>
                                <span class="sr-only"></span>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-2">

                    </div>
                </div>
            </div>
        )
    }

    selectItem(e){
        if(this.state.selected.length < 4 && e.currentTarget.className.indexOf('solved') === -1){
            e.preventDefault();
            var newSel = this.state.selected.concat([ e.currentTarget.innerHTML]);
            var newSolve = this.state.solved;
            var newitems = this.state.items;
            var newTries = this.state.trysRemaining;
            if(newSel.length === 4){
                this.state.board.forEach(el => {
                    var matches = el.group.filter((i) => newSel.indexOf(i) !== -1 );
                    if(matches.length === 4){
                        el.found = true;
                        newSolve.push(el.group); // Add found group to solved
                        // Create new board
                        var newBoard = []; 
                        $.each(newSolve, (i,el) => { // Ad solved rows to board
                            newBoard = newBoard.concat(el);
                        })
                        var remaining = this.state.items.filter((i) => newBoard.indexOf(i) === -1 ); // Remove solved from current board
                        newitems = newBoard.concat(remaining);
                    }
                });

                newSel = [];
            }
            if(this.state.solved > 1 && newSolve.length == this.state.solved.length){
                newTries = newTries - 1;
            }

            this.setState(prevState => ({
                selected: newSel,
                solved: newSolve,
                items: newitems,
                trysRemaining: newTries,
            }));
        } else {

        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 50); // 20 Ticks per second
      }

    componentWillUnmount() {
        clearInterval(this.interval);
      }

    tick(){
        if(timeRemaining > 0){
        this.setState(prevState => ({
            timeRemaining: this.state.timeRemaining - 1,
        }));
        }
    }

}

export default Quiz;