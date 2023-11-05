import React from 'react';
import { useNavigate } from 'react-router-dom';

const ItemCard = ({ id, item_name, description, brand, price, image, published }) => {

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
                {published === false && <p className="text-sm text-gray-700 mb-4">Not Published</p>}
                <button
                    onClick={() => {
                        navigate(`/item-details/${id}`);
                    }}
                    className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
                    View
                </button>
            </div>
        </div>
    );
};

export default ItemCard;

export const HomeCard = ({ id, item_name, brand, price, image }) => {

    const navigate = useNavigate();

    return (
        <div className="bg-white w-80 max-h-[600px] h-[500px] p-4 shadow-md rounded-sm">
            <img src={image} alt={''} className="w-full h-84 object-cover mb-4" />
            <h3 className="text-xl text-black font-medium mb-2 truncate max-h-24 overflow-hidden">{item_name}</h3>
            <p className=" mb-2 font-semibold">{brand}</p>
            <p className="mb-2 font-bold">₹ {price}</p>
            <button
                onClick={() => {
                    navigate(`/item-details/${id}`);
                }}
                className="bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-full">
                View
            </button>
        </div >
    );
};

export const SectionCard = ({ id, category, image }) => {
    return (
        <div className="bg-white w-80 h-[450px] p-4 shadow-md rounded-sm flex flex-col items-center align-middle">
            <img src={image} alt={''} className="w-full h-84 object-cover mb-4 rounded-md" />
            <h3 className="text-xl text-black font-bold mb-2">{category}</h3>
            <p className="text-white mb-2 font-semibold">{''}</p>
            <button
                // onClick={() => {
                //     navigate(`/item-details/${id}`);
                // }}
                className="w-full bg-teal-500 hover:bg-teal-700 text-white px-4 py-2 rounded-md">
                View
            </button>
        </div>
    )
}