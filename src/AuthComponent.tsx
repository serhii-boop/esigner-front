import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';

export const AuthComponent: React.FC = () => {
    const URL = process.env.REACT_APP_PUBLIC_API
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // const handleRegister = async () => {
    //     try {
    //         const response = await axios.post(`${URL}/api/v1/auth/register`, {
    //             email,
    //             password,
    //         });
    //         if(response) {
    //             console.log(response.data.token)
    //         }
    //
    //         setToken(response.data.token);
    //         setError(null);
    //
    //     } catch (err: any) {
    //         setError(err.response.data.message);
    //     }
    // };

    const handleAuthenticate = async () => {
        try {
            const response = await axios.post(`${URL}/api/v1/auth/authenticate`, {
                email,
                password,
            });
            Cookies.set('jwt-token', response.data.token, { secure: true })
            Cookies.set('email', email, { secure: true });
            navigate('/welcome');
        } catch (err: any) {
            setError(err.response.data.message);
        }
    };

    const handleLogout = async () => {
        try {
            // Make a request to the logout endpoint
            await axios.post(`${URL}/api/v1/auth/logout`, {}, { withCredentials: true });

            // Update local state to reflect the user being logged out
            setToken(null);
            setError(null);
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    return (
        <div>
            {token ? (
                <div>
                    <p>Authenticated!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/*<button onClick={handleRegister}>Register</button>*/}
                    <button onClick={handleAuthenticate}>Authenticate</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
            )}
        </div>
    );
};
