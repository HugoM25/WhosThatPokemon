import React from 'react';
import './App.css';

import PlayZone from './components/PlayZone';
import Header from './components/Header';
import Settings from './components/Settings';
import Footer from './components/Footer';
import ScoreBoard from './components/ScoreBoard';

import { GenActive } from 'models/pokemonModel'; 

type AppState = {
  score: number;
  pokemonNumber: string;
  pokemonNames: any;
  isFound: boolean;
  genActive: GenActive[];
}


class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      score: 0,
      pokemonNumber: '',
      pokemonNames: {}, 
      isFound: false,
      genActive: [
        {id: 1, name: 'Generation I', active: true},
        {id: 2, name: 'Generation II', active: true},
        {id: 3, name: 'Generation III', active: true},
        {id: 4, name: 'Generation IV', active: true},
        {id: 5, name: 'Generation V', active: true},
        {id: 6, name: 'Generation VI', active: true},
        {id: 7, name: 'Generation VII', active: true},
        {id: 8, name: 'Generation VIII', active: true},
        {id: 9, name: 'Generation IX', active: true}
      ]
    }
    this.selectRandomPokemon = this.selectRandomPokemon.bind(this);
  }

  componentDidMount(): void {
    
    this.selectRandomPokemon();
  }

  /*Ugly code, but it works*/
  checksIfPokemonIsInSelectedGenerations(pokemonNumber: number) {
    if (pokemonNumber < 0) {
      return false;
    }
    if (pokemonNumber < 152) {
      return this.state.genActive[0].active;
    }
    else if (pokemonNumber < 252) {
      return this.state.genActive[1].active;
    }
    else if (pokemonNumber < 387) {
      return this.state.genActive[2].active;
    }
    else if (pokemonNumber < 494) {
      return this.state.genActive[3].active;
    }
    else if (pokemonNumber < 650) {
      return this.state.genActive[4].active;
    }
    else if (pokemonNumber < 722) {
      return this.state.genActive[5].active;
    }
    else if (pokemonNumber < 810) {
      return this.state.genActive[6].active;
    }
    else if (pokemonNumber < 898) {
      return this.state.genActive[7].active;
    }
    else if (pokemonNumber < 1009) {
      return this.state.genActive[8].active;
    }
    else {
      return false;
    }
  }

  selectRandomPokemon() {
    console.log(this.state.genActive);

    /*Select random pokemon between 1-1008*/
    let randomNum = Math.floor(Math.random() * 1007 +1);

    /*Checks if number of pokemon is in the selected generations*/
    while (!this.checksIfPokemonIsInSelectedGenerations(randomNum)) {
      console.log('Pokemon not in selected generations');
      randomNum = Math.floor(Math.random() * 1007 +1);
    }



    /*Get this pokemon species*/ 
    this.getapi(`https://pokeapi.co/api/v2/pokemon-species/${randomNum}/`).then(data => {

      const names : any = {};
      data.names.forEach((name: any) => {
          names[name.language.name] = name.name;
      });
      console.log(names);

      this.setState({pokemonNumber: data.id.toString(), pokemonNames: names, isFound: false});

    }
    );
  }

  async getapi(url:string) {
    const response = await fetch(url);
    var data = await response.json();
    return data;
  }


  changeGenAvailable = (generations: any) => {
    this.setState({genActive: generations});
  }

  render () {
    return  (
      
      <div className="main-layout">
        <div className="header-content">
          <Header />
        </div>
        <div className='main-content'>
          <div className='tile'>
            <ScoreBoard />
          </div>
          <div className='tile'>
            <PlayZone isFound={this.state.isFound} pokemonNumber={this.state.pokemonNumber} pokemonNames={this.state.pokemonNames} onSuccess={this.selectRandomPokemon}/>
          </div>
          <div className='tile'>
            <Settings  changeGenerationsAvailable={(generations) => this.changeGenAvailable(generations)}/>
          </div>
        </div>
        <div className='footer-content'>
          <Footer />
          </div>
      </div>
    );
  }
}

export default App;
