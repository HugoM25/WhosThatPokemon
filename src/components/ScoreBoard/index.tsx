import React from 'react';
import './index.css';

type ScoreBoardProps = {
    currentStreak: number,
    bestStreak: number
}

type ScoreBoardState = {
    currentStreak: number,
    bestStreak: number
}

class ScoreBoard extends React.Component<ScoreBoardProps,ScoreBoardState> {

    state:ScoreBoardState; 

    constructor(props:ScoreBoardProps){
        super(props);
        this.state = {
            currentStreak : 0, 
            bestStreak : 0
        }
    }

    render () {
        return (
            <div className="score-board">
                <h1>ScoreBoard</h1>
                <h2>Best streak {this.props.bestStreak}</h2>
                <h2>Current streak {this.props.currentStreak}</h2>
            </div>
        );
    }
}

export default ScoreBoard;