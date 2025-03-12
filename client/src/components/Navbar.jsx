import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const storedUser = localStorage.getItem('user');

    // Parse the stored user data (assuming it's in JSON format)
    const user = storedUser ? JSON.parse(storedUser) : null;


    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault(); // Prevent default link behavior
        // Remove user data from localStorage
        localStorage.removeItem('user');

        // Redirect to the signup page
        navigate('/signup');
    };

    return (
        <nav className='bg-gray-800 p-4 fixed w-full top-0 z-10'>
            <div className='container mx-auto flex justify-between items-center'>
                <Link to='/' className='text-white text-lg font-bold'>
                    E-Dashboard
                </Link>
                <div className='space-x-4'>
                    {
                        user ?
                            <>
                                <Link to='/' className='text-gray-300 hover:text-white'>
                                    Product
                                </Link>
                                <Link to='/add' className='text-gray-300 hover:text-white'>
                                    Add
                                </Link>
                                <Link to='/profile' className='text-gray-300 hover:text-white'>
                                    Profile
                                </Link>
                                <Link to='/signup' onClick={logout} className='text-gray-300 hover:text-white'>
                                    Logout({user.name})
                                </Link>
                            </> :
                            <>
                                <Link to='/login' className='text-gray-300 hover:text-white'>
                                    Login
                                </Link> : <Link to='/signup' className='text-gray-300 hover:text-white'>
                                    Signup
                                </Link>
                            </>
                    }

                </div>
            </div>
        </nav>
    );
};

export default Navbar;