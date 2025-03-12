import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to /api/users/login with the form data
            const response = await axios.post('/api/users/login', {
                email,
                password
            });

            // If successful, store the user data in localStorage and navigate to home
            localStorage.setItem('user', JSON.stringify(response.data.user));
            // console.log('Login successful:', response.data);
            setError('');  // Clear any previous error
            navigate('/');  // Redirect to home after successful login
        } catch (error) {
            console.error('Login Error:', error.response.data);
            setError('Login failed, please check your credentials.');
        }
    };

    // Check if the user is already logged in and navigate to home if true
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className='login flex justify-center items-center flex-col mx-auto mt-20 w-1/3'>
            <h2 className='text-2xl font-bold mb-4'>Login</h2>
            {error && <p className='text-red-500 mb-4'>{error}</p>}
            <form onSubmit={handleSubmit} className='w-full'>
                <div className='mb-4'>
                    <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <div className='mb-4'>
                    <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <button
                    type='submit'
                    className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
