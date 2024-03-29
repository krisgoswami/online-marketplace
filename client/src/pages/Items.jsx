import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import ItemCard from '../components/ItemCard';


const Items = () => {

    const [items, setItems] = useState([]);
    const token = localStorage.getItem('token');

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
        <div className='flex flex-col h-full p-4 mt-20'>
            {items?.map((item) =>
                <div key={item?._id} className="mx-10 mt-4">
                    <ItemCard
                        id={item?._id}
                        item_name={item?.item_name}
                        brand={item?.brand}
                        description={item?.description}
                        price={item?.price}
                        image={item?.image}
                        published={item?.published}
                    />
                </div>
            )}
        </div>
    )
}

export default Items;