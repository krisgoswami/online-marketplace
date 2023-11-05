import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import { useEffect } from 'react';
import { useState } from 'react';
import ItemCard from '../components/ItemCard';

const MyItems = () => {

    const [myListedItems, setMyListedItems] = useState([]);

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const user = localStorage.getItem('username');

    const getMyListedItems = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/listed-items`, {
                headers: {
                    'email': email,
                    'Authorization': `Bearer ${token}`,
                }
            });
            // console.log(data);
            if (data?.success) {
                setMyListedItems(data?.listedItems);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMyListedItems();
    }, []);

    return (
        <div className='flex flex-col h-screen overflow-auto p-4 mt-16'>
            <p className='mx-2 md:ml-10 mt-5 mb-3 font-bold text-xl text-center md:text-left'>Items listed by you</p>
            {myListedItems?.map((item) =>
                <div key={item?._id} className="mx-10 mt-4">
                    <ItemCard
                        id={item?._id}
                        item_name={item?.item_name}
                        brand={item?.brand}
                        description={item?.description}
                        price={item?.price}
                        image={item?.image}
                    />
                </div>
            )}
            {myListedItems.length === 0 &&
                <p className='mx-2 md:ml-10 mt-5 mb-3 text-xl text-center md:text-left'>You have not listed any items yet.</p>
            }
        </div>
    )
}

export default MyItems;