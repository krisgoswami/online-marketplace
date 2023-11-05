import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/helper';
import { HomeCard } from '../components/ItemCard';

const Purchases = () => {

    const [purchasedItems, setPurchasedItems] = useState([]);
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    const getPurchases = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/purchased-items`, {
                headers: {
                    'email': email,
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(data);
            if (data.success) {
                setPurchasedItems(data.purchasedItems);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getPurchases();
    }, [])
    return (
        <div className="w-full h-screen p-5 pb-10 mt-20">
            <h2 className="text-xl font-bold mb-10">Your purchases</h2>
            <div className='flex justify-start'>
                {purchasedItems?.map((item) =>
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
                {purchasedItems.length === 0 &&
                    <p className="text-xl font-medium mx-10 mb-4">You have not made any purchases yet</p>
                }
            </div>
        </div>
    )
}

export default Purchases