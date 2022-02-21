import { useState } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";


const Auth = () => {
    const [cookies, setCookie, removeCookies] = useCookies(['user'])
    const [isLogin, setIsLogin] = useState(true)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [passwordCheck, setConfirmPassword] = useState(null)
    const [error, setError] = useState(false)

    const handleSubmit = async (endpoint) => {
        console.log(endpoint);
        if (!isLogin && password !== passwordCheck){
            setError(true)
            return 
        }

        const response = await axios.post(`http://localhost:8000/${endpoint}`, {
            username,
            password
        })

        setCookie('Name', response.data.username);
        setCookie('HashedPassword', response.data.hashedPassword);
        setCookie('UserId', response.data.userId);
        setCookie('AuthToken', response.data.token);

        window.location.reload();
    }


    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-form">
                    <input
                        type='text'
                        id='username'
                        placeholder='username'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type='text'
                        id='password'
                        placeholder='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isLogin && <input
                        type='text' 
                        id='passwordCheck'
                        placeholder='password-check'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />}
                    {error && <p>Password do not match</p>}
                    <button className="standart-button" onClick={() =>  handleSubmit(isLogin ? 'login' : 'signup')}>Go!</button>
                </div>
                <div className="auth-optins">
                    <button 
                        onClick={() => setIsLogin(false)}
                        style={{ backgroundColor: !isLogin ? '#070a0d' : '#151a1f'}}
                    >Sign Up</button>
                    <button 
                        onClick={() => setIsLogin(true)}
                        style={{ backgroundColor: isLogin ? '#070a0d' : '#151a1f'}}    
                    >Log In</button>
                </div>
            </div>    
        </div>
    )
}

export default Auth;

