import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const [user, setUser] = useState({
        name: '', email: '', password: ''
    })

    const onChangeInput = event => {
        const {name, value} = event.target
        setUser({...user, [name]:value})
    }

    const registerSubmit = async event => {
        event.preventDefault()
        try {
            await axios.post('/user/register', {...user})
            localStorage.setItem('firstLogin', true)
            
            window.location.href = '/';
        } catch (error) {
            alert(error.response.data.msg)
        }
    }

    return (
        <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input type="text" name="name" placeholder="Name" value={user.name} id="" required onChange={onChangeInput} />
                <input type="email" name="email" placeholder="Email" value={user.email} id="" required onChange={onChangeInput} />
                <input type="password" name="password" placeholder="Password" value={user.password} autoComplete="on" required id="" onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register
