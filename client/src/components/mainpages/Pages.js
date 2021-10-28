import React, { useContext } from 'react'
import {Switch, Route} from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import DetailProduct from './products/DetailProduct'
import Products from './products/Products'
import NotFound from './utils/NotFound'
function Pages() {

    const state = useContext(GlobalState)
    const [isLoggedIn] = state.userAPI.isLoggedIn

    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />
            <Route path="/login" exact component={isLoggedIn ? NotFound : Login } />
            <Route path="/register" exact component={isLoggedIn ? NotFound: Register} />
            <Route path="/history" exact component={isLoggedIn ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLoggedIn ? OrderDetails : NotFound} />
            <Route path="/cart" exact component={Cart} />
            <Route path="*" exact component={NotFound} />
        </Switch>
        // <div>Main Pages Component</div>
    )
}

export default Pages
