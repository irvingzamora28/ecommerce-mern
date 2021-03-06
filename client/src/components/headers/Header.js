import React, {useContext, useState} from 'react'
import {GlobalState} from '../../GlobalState'
import MenuIcon from './icons/menu.svg'
import CartIcon from './icons/shopping-cart.svg'
import CloseIcon from './icons/close.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {
    const state = useContext(GlobalState)
    const [isLoggedIn] = state.userAPI.isLoggedIn
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async () => {
        await axios.get('/user/logout')
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/"
    }

    const adminRouter = () => {
        return(
            <>
                <li><Link to="/product/create">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>
        )
    }

    const loggedInRouter = () => {
        return(
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

    const toggleMenu = () => setMenu(!menu)
    const styleMenu = {
        left: menu ? 0 : "-100%"
    }
    return (
        <header>
            <div className="menu" onClick={toggleMenu}>
                <img src={MenuIcon} alt="" width="30"></img>
            </div>

            <div className="logo">
                <h1><Link to="/">{isAdmin ? 'Admin' : 'Dev Shop'}</Link></h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link></li>
                {isAdmin && adminRouter()}
                {
                    isLoggedIn ? loggedInRouter() : <li><Link to="/login">Login / Register</Link></li>
                }
                <li onClick={toggleMenu}><img src={CloseIcon} alt="close" width="30" className="menu"/></li>
            </ul>

            {
                isAdmin ? '' :
                <div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart"><img src={CartIcon} alt="" width="30"/></Link>
                </div>
            }

            
        </header>
    )
}

export default Header
