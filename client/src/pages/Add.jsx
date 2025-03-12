import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Retrieve user ID from localStorage
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user ? user.id : null; // Get the user ID

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !price || !category || !company) {
            setError('Please fill in all fields.');
            return;
        }

        try {
            const response = await axios.post('/api/products/add', {
                name,
                price: parseInt(price),
                category,
                user: userId,
                company,
            });

            // After successful product addition, you can navigate to another page
            console.log('Product added successfully:', response.data);
            navigate('/');  // Redirect to homepage or any other route
        } catch (error) {
            setError('Failed to add the product');
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className='flex-col mx-auto mt-20 w-1/3'>
            <h2 className='text-2xl font-bold mb-4'>Add New Product</h2>
            {error && <p className='text-red-500'>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Product Name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Price</label>
                    <input
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Category</label>
                    <input
                        type='text'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700'>Company</label>
                    <input
                        type='text'
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                </div>
                <button
                    type='submit'
                    className='bg-blue-500 mt-4 text-white p-2 rounded hover:bg-blue-700'
                >
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
