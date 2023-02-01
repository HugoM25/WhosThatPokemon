import React from 'react';
import './index.css';
import Background from '../../assets/images/background.png';

type PlayZoneProps = {
    pokemonName: string;
    pokemonNumber: string;
    isFound: boolean;
    onSuccess: () => void;
}

type PlayZoneState = {
    pokemonName: string;
    pokemonNumber: string;
    currentGuess: string;
    isFound: boolean;
    timeBeforeNext: number;
}

class PlayZone extends React.Component<PlayZoneProps, PlayZoneState> {

    state : PlayZoneState;

    constructor(props: PlayZoneProps) {
        super(props);
        this.state = {
            pokemonName: props.pokemonName,
            pokemonNumber: props.pokemonNumber,
            currentGuess: '',
            isFound: props.isFound,
            timeBeforeNext: 0
        }
    }  

    verifyGuess = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({currentGuess: event.target.value});
        if (event.target.value.toLowerCase() === this.props.pokemonName.toLowerCase() && !this.props.isFound) {
            console.log('correct');
            this.setState({isFound: true, currentGuess: ''});
            
            this.launchNextPokemon();
            //this.setState({timeBeforeNext: 3});
            
            //setTimeout(this.coolDownBeforeNext, 1000);
        }
        else {
        }
    }

    coolDownBeforeNext = () => {
        this.setState({timeBeforeNext: this.state.timeBeforeNext - 1});

        if (this.state.timeBeforeNext <= 0) {
            this.launchNextPokemon();
        }
        else {
            setTimeout(this.coolDownBeforeNext, 1000);
        }
    }

    launchNextPokemon = () => {
        this.props.onSuccess();
        this.setState({isFound: this.props.isFound});
    }

    render() {
        return (
        <div className="play-zone">
            <div className='poke-display'>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.props.pokemonNumber}.png`} alt="pokemon" className={`${this.state.isFound ? "" : "hide-img"} poke-img`} />
                <img src={Background} alt="background" className='background-img rotate'/>
            </div>
            <div className='input-spot'>
                {this.state.timeBeforeNext > 0 ? <p className='countdown'>Next in {this.state.timeBeforeNext}</p> : <input type="text" value={this.state.currentGuess} className='guess-input' onChange={(e) => this.verifyGuess(e)}/>}
            </div>
        </div>
        );
    }
}

export default PlayZone;