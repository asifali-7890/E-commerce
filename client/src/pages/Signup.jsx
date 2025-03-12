import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlreadyHaveAccount from './AlreadyHaveAccount.jsx';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');

        if (user) {
            // If user exists in localStorage, navigate to home page
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        axios.defaults.withCredentials = true;
        e.preventDefault();

        try {
            // Send a POST request to /api/users/register with the form data
            const response = await axios.post('/api/users/register', {
                name,
                email,
                password,
            });

            // Assuming response contains the user data (e.g., token, user details)
            const userData = response.data; // Adjust based on your API's respons

            // Save user data in localStorage
            localStorage.setItem('user', JSON.stringify(userData.user));

            // If successful, update success message
            setSuccess('User registered successfully');
            navigate('/');
            setError('');
        } catch (err) {
            // Handle errors and update the error message
            setError(err.response?.data?.message || 'An error occurred');
            setSuccess('');
            console.error('Error:', err);
        }
    };

    return (
        <div className='flex justify-center items-center flex-col h-screen-3/4 mx-auto mt-20 w-1/3'>
            <h2 className='text-2xl font-bold mb-4'>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-full p-2 border border-gray-300 rounded mt-1'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Email</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-2 border border-gray-300 rounded mt-1'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Password</label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full p-2 border border-gray-300 rounded mt-1'
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'
                >
                    Register
                </button>

                <AlreadyHaveAccount />

                {/* Show success or error messages */}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default Signup;

