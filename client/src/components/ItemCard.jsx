import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ id, item_name, description, brand, price, image }) => {

    const navigate = useNavigate();

    return (
        <div className="flex items-center border p-4 mb-4">
            <div className="flex-shrink-0 w-40 h-40">
                <img src={image} alt={''} className="w-full h-full object-cover" />
            </div>
            <div className="ml-4">
                <h2 className="text-xl font-bold mb-4">{brand}</h2>
                <p className="text-gray-700 w-3/4 font-medium mb-4">{item_name}</p>
                <p className="text-gray-700 mb-2 w-3/4 text-justify">{description}</p>
                <p className="text-black font-bold mb-4">{`₹${price}`}</p>
                <button
                    onClick={() => {
                        navigate(`/ground/${id}`);
                    }}
                    className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-full">
                    View
                </button>
            </div>
        </div>
    );
};

export default ItemCard;  