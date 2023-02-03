import React from 'react';
import './index.css';

class Footer extends React.Component {
    render() {
        return (
        <div className="footer">
            <p className='text-desc'>Find the source code on this {""} 
                <a className="link-github"href="https://github.com/HugoM25/WhosThatPokemonWebApp">page</a> 
            </p>
        </div>
        );
    }
}

export default Footer;