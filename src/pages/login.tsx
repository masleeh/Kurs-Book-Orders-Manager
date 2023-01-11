import React, {useEffect, useState} from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login:React.FC = () => {

    // Setting states from form

    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const changeLogin = (event: React.ChangeEvent<HTMLInputElement>):void => {
        const {value} = event.target
        setLogin(value)
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>):void => {
        const {value} = event.target
        setPassword(value)
    }

    // Checking login and password and setting token to local storage
    
    const navigate = useNavigate()
    const sendAuthData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/login', {
                name: login,
                password: password
            })
            localStorage.setItem('authToken', response.data.token)
            navigate('/manager/orders')
            
        } catch (error) {
            alert('Wrong password or login, try again')
            setLogin('')
            setPassword('')
        }
    }

    const authorize = ():void => {
        sendAuthData()
    }

    return (
        <div className="login">
            <h1 className='login-header'>Login:</h1>
            <input className='login-input' value={login} onChange={changeLogin}/>
            <h1 className='login-header'>Password:</h1>
            <input className='login-input' type="password" value={password} onChange={changePassword}/>
            <button className='login-button' onClick={authorize}>Sign in</button>
        </div>
    )
}

export default Login