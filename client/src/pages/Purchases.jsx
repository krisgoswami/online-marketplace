import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from '../utils/helper';

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
        <div>Purchases</div>
    )
}

export default Purchases