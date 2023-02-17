import React from 'react';
import './index.css';

type ScoreBoardProps = {
    currentStreak: number,
    bestStreak: number
}

class ScoreBoard extends React.Component<ScoreBoardProps,{}> {

    render () {
        return (
            <div className="scoreboard-container">
                <h2 className='text-score'> 🏆Best streak  : {this.props.bestStreak}</h2>
                <h2 className='text-score'> 🔥Current streak : {this.props.currentStreak}</h2>
            </div>
        );
    }
}

export default ScoreBoard;