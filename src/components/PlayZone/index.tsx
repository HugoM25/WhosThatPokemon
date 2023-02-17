import React from 'react';
import './index.css';
import Background from '../../assets/images/background2.png';

type PlayZoneProps = {
    pokemonNames: any;
    pokemonNumber: string;
    onSuccess: () => void;
    onSkip: () => void;
}

type PlayZoneState = {
    currentGuess: string;
    isFound: boolean;
    timeBeforeNext: number;
    isImgLoaded : boolean;
}

class PlayZone extends React.Component<PlayZoneProps, PlayZoneState> {

    state : PlayZoneState;
    inputRef: React.RefObject<HTMLInputElement>;

    constructor(props: PlayZoneProps) {
        super(props);
        this.state = {
            currentGuess: '',
            isFound: false,
            timeBeforeNext: 0,
            isImgLoaded: false
        }
        this.inputRef = React.createRef();
    }  


    cleanString = (str: string) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace('-', ' ');
    }


    verifyGuess = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({currentGuess: event.target.value});
        /* verify if the guess is correct for any name in any language */
        for (const [key, value] of Object.entries(this.props.pokemonNames)) {
            if (this.cleanString(event.target.value) === this.cleanString(value as string)) {
                console.log('correct');
                this.setState({isFound: true, currentGuess: ''});

                this.inputRef.current?.blur();
                
                /*Launch next pokemon after 1s*/
                setTimeout(() => {
                    this.launchNextPokemon();
                }, 1000);
            }
        }
    }

    launchNextPokemon = () => {
        this.props.onSuccess();
    }


    render() {
        return (
        <div className="play-zone">
            <div className='display-spot'>
                <img 
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.props.pokemonNumber}.png`} 
                    alt="pokemon" 
                    className={`${this.state.isFound ? "" : "hide-img"} poke-img`}
                    style= {{opacity: this.state.isImgLoaded ? 1 : 0}}
                    onLoad={() => this.setState({isImgLoaded: true, isFound: false})}   
                />
                <img src={Background} alt="background" className='background-img rotate'/>
            </div>
            <div className='input-spot'>
                <input ref={this.inputRef} type="text" value={this.state.currentGuess} className='guess-input' onChange={(e) => this.verifyGuess(e)}/>
                <button className='skip-button' onClick={this.props.onSkip}>
                    <span>skip</span>
                </button>
            </div>
        </div>
        );
    }
}

export default PlayZone;