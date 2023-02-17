import React from 'react';
import './App.css';

import PlayZone from './components/PlayZone';
import Header from './components/Header';
import Settings from './components/Settings';
import Footer from './components/Footer';
import ScoreBoard from './components/ScoreBoard';

import { GenActive } from 'models/pokemonModel'; 

import data from 'assets/JSON/data.json';

type AppState = {
  score: number;
  pokemonNumber: string;
  pokemonNames: any;
  isFound: boolean;
  genActive: GenActive[];

  currentStreak: number;
  bestStreak: number;
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
      ],
      currentStreak:0,
      bestStreak:0
    }
    this.selectRandomPokemon = this.selectRandomPokemon.bind(this);
  }

  componentDidMount(): void {
    this.selectRandomPokemon();
  }

  selectRandomPokemon() {
    console.log(this.state.genActive);

    /*Select random generation after counting generations actives*/
    let count = 0;
    this.state.genActive.forEach((gen) => {
      if(gen.active) {
        count++;
      }
    });

    let randomGen = Math.floor(Math.random() * count +1);

    /*Select random active generation in this.state.genActive*/
    let genSelected = 0;
    let genSelectedId = 0;
    this.state.genActive.forEach((gen) => {
      if(gen.active) {
        genSelected++;
        if(genSelected === randomGen) {
          genSelectedId = gen.id;
        }
      }
    });

    /*Use data from JSON file to get the range of pokemon numbers for this generation*/
    let min = data.generationsID[genSelectedId-1].generationNbStart;    ;
    let max = data.generationsID[genSelectedId-1].generationNbEnd;
    
    
    /*Select random pokemon between 1-1008*/
    let randomNum = Math.floor(Math.random() * (max-min) + min);

    console.log(genSelectedId);
    console.log(min);
    console.log(max);
    console.log(randomNum);


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

  foundThePokemon = () => {
    const newScore = this.state.currentStreak+1; 
    this.setState({
      currentStreak: newScore,
      bestStreak: this.state.bestStreak <= this.state.currentStreak ? newScore : this.state.bestStreak
    })
    this.selectRandomPokemon();
  }

  failedThePokemon = () => {
    this.setState({
      bestStreak : this.state.bestStreak < this.state.currentStreak ? this.state.currentStreak : this.state.bestStreak,
      currentStreak: 0
    })
    this.selectRandomPokemon();
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

        <div className="cell-header">
          <Header />
        </div>

        <div className='cell-scoreboard'>
          <ScoreBoard bestStreak={this.state.bestStreak} currentStreak={this.state.currentStreak}/>  
        </div>
        <div className='cell-play-area'>
          <PlayZone  pokemonNumber={this.state.pokemonNumber} pokemonNames={this.state.pokemonNames} onSuccess={this.foundThePokemon} onSkip={this.failedThePokemon}/>
        </div>
        <div className='cell-settings'>
          <Settings  changeGenerationsAvailable={(generations) => this.changeGenAvailable(generations)}/>
        </div>
      
        <div className='cell-footer'>
          <Footer />
        </div>

      </div>
    );
  }
}

export default App;
