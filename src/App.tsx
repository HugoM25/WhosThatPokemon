import React from 'react';
import './App.css';

import PlayZone from './components/PlayZone';
import Header from './components/Header';
import Settings from './components/Settings';
import Footer from './components/Footer';
import ScoreBoard from './components/ScoreBoard';


import pokedexData from './assets/JSON/pokedex.json';


type AppState = {
  score: number;
  pokemonImage: string;
  pokemonName: string;
  isFound: boolean;
}



class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      score: 0,
      pokemonImage: '',
      pokemonName: '', 
      isFound: false,
    }
    this.selectRandomPokemon = this.selectRandomPokemon.bind(this);
  }

  componentDidMount(): void {
    
    this.selectRandomPokemon();
  }

  selectRandomPokemon () {	
    /*Select a random pokemon from the json file*/ 
    const pokedexDataJSON = JSON.parse(JSON.stringify(pokedexData));
    console.log(pokedexDataJSON);
    const randomNum : string = Object.keys(pokedexDataJSON)[Math.floor(Math.random() * Object.keys(pokedexDataJSON).length)];
    const pkmName :string = Object.keys(pokedexDataJSON[randomNum])[0];
    const randomPokemon = pokedexDataJSON[randomNum][pkmName];

    console.log(pkmName);
    /*Set the state to the random pokemon*/
    this.setState({pokemonImage: randomPokemon.image, pokemonName: pkmName, isFound: false});
  }

  render () {
    return  (
      <div className="main-layout">
        <Header />
        <div className='main-content'>
          <ScoreBoard />
          <PlayZone isFound={this.state.isFound} pokemonImage={this.state.pokemonImage} pokemonName={this.state.pokemonName} onSuccess={this.selectRandomPokemon}/>
          <Settings />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
