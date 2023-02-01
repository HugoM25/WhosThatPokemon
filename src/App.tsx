import React from 'react';
import './App.css';

import PlayZone from './components/PlayZone';
import Header from './components/Header';
import Settings from './components/Settings';
import Footer from './components/Footer';
import ScoreBoard from './components/ScoreBoard';

type AppState = {
  score: number;
  pokemonNumber: string;
  pokemonName: string;
  isFound: boolean;
}



class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      score: 0,
      pokemonNumber: '',
      pokemonName: '', 
      isFound: false,
    }
    this.selectRandomPokemon = this.selectRandomPokemon.bind(this);
  }

  componentDidMount(): void {
    
    this.selectRandomPokemon();
  }
/*
  selectRandomPokemon () {	
    const pokedexDataJSON = JSON.parse(JSON.stringify(pokedexData));
    const randomNum : string = Object.keys(pokedexDataJSON)[Math.floor(Math.random() * Object.keys(pokedexDataJSON).length)];
    const pkmName :string = Object.keys(pokedexDataJSON[randomNum])[0];
    const randomPokemon = pokedexDataJSON[randomNum][pkmName];

    console.log(pkmName);

    const numParsed = parseInt(randomNum.replace("#",'')).toString();
    this.setState({pokemonNumber: numParsed, pokemonName: pkmName, isFound: false});
  }
*/

  selectRandomPokemon() {
    /* Select random pokemon between 0-1008*/
    const randomNum = Math.floor(Math.random() * 1008);

    this.getapi(`https://pokeapi.co/api/v2/pokemon/${randomNum}/`).then(data => {
      console.log(data);
      console.log(data.name);
      this.setState({pokemonNumber: data.id.toString(), pokemonName: data.name, isFound: false});
    });
  }

  async getapi(url:string) {
    const response = await fetch(url);
    var data = await response.json();
    return data;
  }

  render () {
    return  (
      <div className="main-layout">
        <div className="header-content">
          <Header />
        </div>
        <div className='main-content'>
          <ScoreBoard />
          <PlayZone isFound={this.state.isFound} pokemonNumber={this.state.pokemonNumber} pokemonName={this.state.pokemonName} onSuccess={this.selectRandomPokemon}/>
          <Settings />
        </div>
        <div className='footer-content'>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
