import React, { useEffect, useState } from 'react'
import { SectionCard } from './ItemCard';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';

const Categories = () => {

    const [items, setItems] = useState([]);

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


    return (
        <div className="w-full p-10 bg-gray-200 overflow-auto">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <div className='flex justify-between overflow-auto'>
                {items?.slice(0, 4).map((item) =>
                    <div key={item?._id} className="mx-10 mt-4">
                        <SectionCard
                            id={item?._id}
                            category={item?.item_type}
                            image={item?.image}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

export default Categories