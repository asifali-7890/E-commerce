import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [updatedData, setUpdatedData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [user, setUser] = useState(null); // Store the user state
    const navigate = useNavigate();

    // Fetch user from localStorage only once when the component mounts
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser && savedUser.id) {
            setUser(savedUser); // Set user state here
        } else {
            navigate('/login'); // Redirect if no user is found
        }
    }, [navigate]);

    // Fetch user profile when user is set
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user && user.id) {
                try {
                    const response = await axios.get(`/api/users/profile`, {
                        params: { id: user.id },
                    });
                    setUpdatedData(response.data); // Initialize updated data with fetched data
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                }
            }
        };

        if (user) {
            fetchUserProfile();
        }
    }, [user]);

    // Handle input change for editing profile
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Submit updated profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/users/edit', {
                id: user.id,
                ...updatedData,
            });
            console.log('Profile updated successfully:', response.data);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Profile Page</h1>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={updatedData.name}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Name"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={updatedData.email}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Email"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={updatedData.password}
                        onChange={handleChange}
                        className="border rounded w-full py-2 px-3 text-gray-700"
                        placeholder="Password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default ProfilePage;
