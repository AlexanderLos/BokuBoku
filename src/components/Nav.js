import React from 'react';
import { Link } from 'react-router-dom';
import '../css/nav.css'; 

function Nav() {
    return (
        <nav className='NavBar'>
            <div className='NavLinks'>
                <Link to='/about'>ABOUT</Link>
                <Link to='/gallery'>GALLERY</Link>
                <Link to='/thelore'>THE LORE</Link>
                <Link to='/partnerships'>PARTNERSHIPS</Link>
                <Link to='/shop'>SHOP</Link>
            </div>
            <div className='SecondNavLinks'>
                <Link to='/boryokupub' className='button-link' className='button-pub'>BŌRYOKU PUB</Link>
                <Link to='/game' className='button-link' className='button-game'>GAME</Link>
                <Link to='/metaverse' className='button-link' className='button-metaverse'>METAVERSE</Link>
                <Link to='/buy' className='button-link' className='button-buy'>BUY</Link>
            </div>
        </nav>
    );
}

export default Nav;
