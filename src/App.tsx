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

  selectRandomPokemon() {
    /*Select random pokemon between 1-1008*/
    const randomNum = Math.floor(Math.random() * 1007 +1);

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
            <Settings />
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
