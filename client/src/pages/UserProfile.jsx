import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/helper';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserProfile = () => {

    const navigate = useNavigate();
    const id = useParams().id;
    const token = localStorage.getItem('token');

    const [inputs, setInputs] = useState({});
    const [user, setUser] = useState({});

    const getUserDetails = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/profile/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            // console.log(data);
            if (data?.success) {
                setUser(data?.user);
                setInputs(prevInputs => ({
                    ...prevInputs,
                    username: data?.user.username,
                    email: data?.user.email,
                    password: data?.user.password,
                }));
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getUserDetails();
    }, []);

    //handle input change
    const handleInputChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.username || !inputs.password) {
            toast.error("Fields cannot be empty");
            return;
        }

        try {
            if (token) {
                const formData = new FormData(); // FormData object to send files

                formData.append('username', inputs.username);
                formData.append('password', inputs.password);

                const { data } = await axios.put(`${BASE_URL}/api/v1/user/profile/${id}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                if (data.success) {
                    toast.success("User profile updated");
                    localStorage.setItem("username", data?.user.username);
                    navigate('/');
                } else {
                    toast.error("Error updating profile");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Check log.");
        }
    }

    return (
        <div className="p-8 mt-20">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={inputs.username}
                        onChange={handleInputChange}
                        className="w-1/2 border border-gray-300 rounded px-4 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={inputs.email}
                        disabled={true}
                        className="w-1/2 border border-gray-300 rounded px-4 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={inputs.password}
                        onChange={handleInputChange}
                        className="w-1/2 border border-gray-300 rounded px-4 py-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-700 text-white py-2 rounded-lg px-4"
                >
                    Update
                </button>
            </form>
        </div>
    )
}

export default UserProfile;