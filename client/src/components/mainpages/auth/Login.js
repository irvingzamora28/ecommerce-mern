import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Login() {

    const [user, setUser] = useState({
        email: '', password: ''
    })

    const onChangeInput = event => {
        const {name, value} = event.target
        setUser({...user, [name]:value})
    }

    const loginSubmit = async event => {
        event.preventDefault()
        try {
            await axios.post('/user/login', {...user})
            
            window.location.href = '/';
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" placeholder="Email" value={user.email} id="" required onChange={onChangeInput} />
                <input type="password" name="password" placeholder="Password" value={user.password} autoComplete="on" required id="" onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login
