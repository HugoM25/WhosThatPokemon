import React from 'react';
import './index.css';

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

class Settings extends React.Component {
    render () {
        return (
            <div className="settings">
                <h1 className='settings-title'>Settings</h1>
                <div className="button-container">
                {
                    generations.map((generation) => {
                        return (
                            <div className="generation" key={generation.id}>
                                <button className="button-settings">
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