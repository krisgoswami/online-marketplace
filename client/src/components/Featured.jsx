import React, { useEffect, useState } from 'react'
import { HomeCard } from './ItemCard';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';

const Featured = () => {

    const [items, setItems] = useState([]);
    const [randomizedItems, setRandomizedItems] = useState([]);

    const getAllItems = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/common/get-items`);
            if (data.success) {
                setItems(data.items);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllItems();
    }, []);

    useEffect(() => {
        const shuffledItems = items.slice().sort(() => Math.random() - 0.5);
        setRandomizedItems(shuffledItems);
    }, [items]);


    return (
        <div className="w-full p-5 pb-10 bg-gray-200">
            <h2 className="text-xl font-bold mb-4">Featured Items</h2>
            <div className='flex justify-center'>
                {randomizedItems?.slice(0, 4).map((item) =>
                    <div key={item?._id} className="mx-10 mt-4">
                        <HomeCard
                            id={item?._id}
                            item_name={item?.item_name}
                            brand={item?.brand}
                            price={item?.price}
                            image={item?.image}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Featured