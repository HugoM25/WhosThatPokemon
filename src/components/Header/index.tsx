import React from 'react';
import './index.css';
import title from 'assets/images/title_logo.png';

class Header extends React.Component {
    render() {
        return (
        <div className="header">
            <img src={title} alt="Who's that pokemon ?" className='image-title' />
        </div>
        );
    }
}

export default Header;