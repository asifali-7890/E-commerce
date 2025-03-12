import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]); // For storing filtered products
    const [search, setSearch] = useState('');

    useEffect(() => {
        setFilteredProducts(
            products.filter((product) =>
                product.name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, products]);

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products/list');
                setProducts(response.data);
                setFilteredProducts(response.data); // Initialize filtered products with all products
            } catch (error) {
                console.error('Error fetching product list:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/products/delete/${id}`);
            console.log('Product deleted successfully');
            setProducts(products.filter((product) => product._id !== id));
            // Optionally, refresh the product list after deletion or update the UI
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className='container mx-auto mt-10'>
            <h1 className='text-2xl font-bold mb-6 text-center'>Product List</h1>
            <div className='mb-4 text-center'>
                <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='border rounded w-1/2  py-2 px-3 text-gray-700 '
                    placeholder='Please search here...'
                    required
                />
            </div>
            {products.length === 0 ? (
                <p>No products available.</p>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-30'>
                    {filteredProducts.map((product) => (
                        <div key={product._id} className='bg-white shadow-md rounded-lg p-4'>
                            <h2 className='text-lg font-bold mb-2'>{product.name}</h2>
                            <p className='text-gray-600'>Price: ₹{product.price}</p>
                            <p className='text-gray-600'>Category: {product.category}</p>
                            <p className='text-gray-600'>Company: {product.company}</p>
                            <p className='text-gray-600'>User: {product.user}</p>
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="bg-red-500 mt-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Delete
                            </button>
                            <Link
                                to={`/update/${product._id}`}
                                className="bg-red-500 ml-2 mt-2 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                <span className="text-white">Update</span>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductList;
