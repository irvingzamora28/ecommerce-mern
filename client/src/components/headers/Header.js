import React, {useState, useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import MenuIcon from './icons/menu.svg'
import CartIcon from './icons/shopping-cart.svg'
import CloseIcon from './icons/close.svg'
import {Link} from 'react-router-dom'

function Header() {
    const value = useContext(GlobalState)
    return (
        <header>
            <div className="menu">
                <img src={MenuIcon} alt="" width="30"></img>
            </div>

            <div className="logo">
                <h1><Link to="/">Ecommere Shop</Link></h1>
            </div>

            <ul>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/login">Login / Register</Link></li>
                <li><img src={CloseIcon} alt="close" width="30" className="menu"/></li>
            </ul>

            <div className="cart-icon">
                <span>0</span>
                <Link to="/cart"><img src={CartIcon} alt="" width="30"/></Link>
            </div>
        </header>
    )
}

export default Header