import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const navigate = useNavigate(); // To navigate back after the update

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch the single product data on component mount
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                const product = response.data;

                // Populate the form fields with the fetched product data
                setName(product.name);
                setPrice(product.price);
                setCategory(product.category);
                setCompany(product.company);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to fetch product details.');
            }
        };

        fetchProduct();
    }, [id]);

    // Update product function
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`/api/products/update/${id}`, {
                name,
                price,
                category,
                company,
            });

            setSuccess('Product updated successfully');
            setError('');
            // Navigate to another page or give feedback to the user
            navigate('/');
        } catch (err) {
            console.error('Error updating product:', err);
            setError('Failed to update product.');
            setSuccess('');
        }
    };

    return (
        <div className='container mx-auto p-6 w-1/2'>
            <h1 className='text-3xl font-bold mb-4'>Update Product</h1>

            {error && <p className='text-red-500 mb-4'>{error}</p>}
            {success && <p className='text-green-500 mb-4'>{success}</p>}

            <form onSubmit={handleUpdate}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Name:</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border rounded w-full py-2 px-3 text-gray-700'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700'>Price:</label>
                    <input
                        type='number'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className='border rounded w-full py-2 px-3 text-gray-700'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700'>Category:</label>
                    <input
                        type='text'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className='border rounded w-full py-2 px-3 text-gray-700'
                        required
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700'>Company:</label>
                    <input
                        type='text'
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className='border rounded w-full py-2 px-3 text-gray-700'
                        required
                    />
                </div>

                <button
                    type='submit'
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
