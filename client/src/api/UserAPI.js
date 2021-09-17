import React, { useState, useEffect } from 'react'
import axios from 'axios'

function UserAPI(token) {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() => {
        console.log("params.token");
        console.log(token);
        if (token) {
            const getUser = async () => {
                try {
                    console.log("token");
                    console.log(token);
                    const res = await axios.get('/user/information', {
                        headers: {Authorization: token}
                    })
                    setIsLoggedIn(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    setCart(res.data.cart)
                    console.log(res);
                } catch (error) {
                    console.log(error.response.data.msg);
                }
            }

            getUser()
        }
        
    }, [token])

    useEffect(() => {
        if (token) {
            const getHistory = async() => {
                const res = await axios.get('/user/history', {
                    headers: {Authorization: token}
                })
                setHistory(res.data);
            }
            getHistory()
        }
        
    }, [token])

    const addCart = async (product) => {
        if (!isLoggedIn) return alert("Please login to continue")
        const check = cart.every((item) => {
            return item._id !== product._id
        })

        if (check) {
            setCart([...cart, {...product, quantity: 1}])
            await axios.patch("/user/addcart", {cart: [...cart, {...product, quantity: 1}]}, {
                headers: {Authorization: token}
            })
        } else {
            alert("This product has been added to the cart")
        }
    }

    return {
        isLoggedIn: [isLoggedIn, setIsLoggedIn],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory]
    }
}

export default UserAPI
