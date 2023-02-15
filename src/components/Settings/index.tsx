import React from 'react';
import './index.css';
import { GenActive } from 'models/pokemonModel';

const generations = [
    {id: 1, name: 'Generation I'},
    {id: 2, name: 'Generation II'},
    {id: 3, name: 'Generation III'},
    {id: 4, name: 'Generation IV'},
    {id: 5, name: 'Generation V'},
    {id: 6, name: 'Generation VI'},
    {id: 7, name: 'Generation VII'},
    {id: 8, name: 'Generation VIII'},
    {id: 9, name: 'Generation IX'}
]



type SettingsState = {
    generations: GenActive[];
}


type SettingsProps = {
    changeGenerationsAvailable : (generations: GenActive[]) => void
}

class Settings extends React.Component<SettingsProps, SettingsState> {

    state : SettingsState;
    
    constructor(props: any) {
        super(props);

        this.state = {
            generations: generations.map((generation) => {
                return {
                    id: generation.id,
                    name: generation.name,
                    active: true
                }
            })
        }
    }

    switchGeneration(index: number) {
        console.log(index);
        const generations = this.state.generations;
        generations[index].active = !generations[index].active;

        this.props.changeGenerationsAvailable(generations);
    }

    render () {
        return (
            <div className="settings-container">
                <h2 className='settings-subtitle'>Generations</h2>
                <div className="button-container">
                {
                    generations.map((generation) => {
                        return (
                            <div className="generation" key={generation.id}>
                                <button className={`button-settings ${this.state.generations[generation.id-1].active ? 'active': null}`} onClick={() => this.switchGeneration(generation.id-1)}>
                                    <span>{generation.name}</span>
                                </button>
                            </div>
                        );
                    })
                }
                </div>
            </div>
        );
    }
}

export default Settings;