import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from '../utils/helper';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const ItemDetails = () => {

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    const navigate = useNavigate();
    const id = useParams().id;
    const [inputs, setInputs] = useState({});
    const [item, setItem] = useState({});

    //global state
    let isLogin = useSelector((state) => state.isLogin);
    isLogin = isLogin || localStorage.getItem('userId');


    //logic to get ground details
    const getItemDetails = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/common/get-item/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(data);
            if (data?.success) {
                setItem(data?.item);
                setInputs({
                    brand: data?.item.brand,
                    item_name: data?.item.item_name,
                    category: data?.item.category,
                    item_type: data?.item.item_type,
                    description: data?.item.description,
                    price: data?.item.price,
                    image: data?.item.image,
                    createdBy: data?.item.createdBy,
                })
                console.log(inputs.brand);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getItemDetails();
    }, []);

    //logic to book ground
    const bookGround = async (e) => {
        e.preventDefault();
        if (selectedDate === "" || selectedTimeSlot === "") {
            toast.error("Select date and time");
            return;
        }
        try {
            const { data } = await axios.post(`${BASE_URL}/api/v1/user/book-slot/${id}`, {
                date: selectedDate,
                timeSlot: selectedTimeSlot,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            if (data.success) {
                toast.success("Ground booked!");
                navigate('/bookings');
            }
        } catch (error) {
            console.log(error);
            toast.error("already booked");
        }
    }

    return (
        <div className="max-w-full h-screen ml-64 p-10 flex">
            {/* Product Image */}
            <div className="w-2/5 pr-8">
                <img
                    src={inputs.image}
                    alt="Product"
                    className="w-full h-auto"
                />
            </div>

            <div className="w-full mr-20">
                <h1 className="text-3xl max-w-3xl font-semibold mb-2">{inputs.item_name}</h1>
                <h1 className="text-xl text-gray-700 font-semibold mb-4">{inputs.brand}</h1>
                <div className="text-xl font-bold mb-4">₹ {inputs.price}</div>
                <p className="text-lg max-w-2xl text-justify text-gray-700 mb-4">{inputs.description}</p>
                {user === inputs.createdBy ?
                    <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full">
                        Edit item
                    </button> :
                    <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full">
                        Buy now
                    </button>
                }
            </div>
        </div>
    );
}
export default ItemDetails;