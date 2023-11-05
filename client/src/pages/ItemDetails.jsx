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


    //logic to get item details
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
                    published: data?.item.published,
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

    //logic to delete
    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`${BASE_URL}/api/v1/user/delete-item/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (data?.success) {
                toast.success("Item deleted");
                navigate('/listed-items');
            }
        } catch (error) {
            console.log(error);
        }
    }

    //to check if user is logged in or not
    const authCheck = () => {
        if (isLogin) {
            navigate(`/purchase/${id}`);
        } else {
            navigate('/login');
        }
    }

    return (
        <div className="max-w-full h-screen ml-64 p-10 flex mt-20">
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
                {inputs.published === false && <p className="text-sm max-w-2xl text-justify text-gray-700 mb-4">Not Published</p>}

                {user === inputs.createdBy ?
                    <div className='flex justify-between max-w-2xl'><button onClick={() => {
                        navigate(`/update-item/${id}`);
                    }}
                        className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full">
                        Edit ✏️
                    </button>
                        <button onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                            Delete 🗑️
                        </button></div> :
                    <button onClick={authCheck} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-full">
                        Buy now
                    </button>
                }
            </div>
        </div>
    );
}
export default ItemDetails;