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
  pokemonNames: any;
  isFound: boolean;
}



class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      score: 0,
      pokemonNumber: '',
      pokemonNames: {}, 
      isFound: false,
    }
    this.selectRandomPokemon = this.selectRandomPokemon.bind(this);
  }

  componentDidMount(): void {
    
    this.selectRandomPokemon();
  }
/*
  selectRandomPokemonOld() {
    const randomNum = Math.floor(Math.random() * 1008);

    this.getapi(`https://pokeapi.co/api/v2/pokemon/${randomNum}/`).then(data => {
      console.log(data);
      console.log(data.name);
      this.setState({pokemonNumber: data.id.toString(), pokemonName: data.name, isFound: false});
    });
  }*/

  selectRandomPokemon() {
    /*Select random pokemon between 1-1008*/
    const randomNum = Math.floor(Math.random() * 1007 +1);

    /*Get this pokemon species*/ 
    this.getapi(`https://pokeapi.co/api/v2/pokemon-species/${randomNum}/`).then(data => {
      console.log(data);
      console.log(data.name);
      /*Get the english name of the pokemon*/

      const names : any = {};
      data.names.forEach((name: any) => {
          names[name.language.name] = name.name;
      });

      this.setState({pokemonNumber: data.id.toString(), pokemonNames: names, isFound: false});

    }
    );
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
          <PlayZone isFound={this.state.isFound} pokemonNumber={this.state.pokemonNumber} pokemonNames={this.state.pokemonNames} onSuccess={this.selectRandomPokemon}/>
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
