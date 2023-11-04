import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/helper';
import Switch from 'react-switch';
import toast from 'react-hot-toast';


const CreateItem = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    // const email = localStorage.getItem('email');

    const [inputs, setInputs] = useState({
        item_name: "",
        description: "",
        price: "",
        image: "",
        published: false,
    });
    const handleInputChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const [brand, setBrand] = useState('');
    const handleBrand = (e) => {
        const selectedValue = e.target.value;
        setBrand(selectedValue);
    };
    const [category, setCategory] = useState('');
    const handleCategory = (e) => {
        const selectedValue = e.target.value;
        setCategory(selectedValue);
    };
    const [itemType, setItemType] = useState('');
    const handleItemType = (e) => {
        const selectedValue = e.target.value;
        setItemType(selectedValue);
    };

    //handle publish switch change
    const handleSwitchChange = () => {
        setInputs(prevState => ({
            ...prevState,
            published: !prevState.published
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.item_name || !inputs.description || !inputs.price || !inputs.image) {
            toast.error("Fields cannot be empty");
            return;
        }

        try {
            if (token) {
                const formData = new FormData(); // FormData object to send files

                formData.append('brand', brand);
                formData.append('item_name', inputs.item_name);
                formData.append('category', category);
                formData.append('item_type', itemType);
                formData.append('description', inputs.description);
                formData.append('price', inputs.price);
                formData.append('image', inputs.image);
                formData.append('published', inputs.published);

                const { data } = await axios.post(`${BASE_URL}/api/v1/user/create-item`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                console.log(data);
                if (data.success) {
                    toast.success("Item created");
                    navigate('/items');
                } else {
                    toast.error("Error creating item");
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong. Check log.");
        }
    }

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Create an item to list</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Brand</label>
                    <select
                        name='brand'
                        value={brand}
                        onChange={handleBrand}
                        className="w-1/2 border border-gray-300 rounded p-2"
                    >
                        <option value="">Select a Item Type</option>
                        <option value="ASUS">ASUS</option>
                        <option value="Samsung">Samsung</option>
                        <option value="Apple">Apple</option>
                        <option value="DELL">DELL</option>
                        <option value="Lenovo">Lenovo</option>
                        <option value="Oneplus">Oneplus</option>
                        <option value="Redmi">Redmi</option>
                        <option value="Logitech">Logitech</option>
                        <option value="Hisense">Hisense</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Item Name</label>
                    <input
                        type="text"
                        name="item_name"
                        value={inputs.item_name}
                        onChange={handleInputChange}
                        className="w-1/2 border border-gray-300 rounded px-4 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Category</label>
                    <select
                        name='category'
                        value={category}
                        onChange={handleCategory}
                        className="w-1/2 border border-gray-300 rounded p-2"
                    >
                        <option value="">Select a Category</option>
                        <option value="Appliances">Appliances</option>
                        <option value="Computers & Accessories">Computers & Accessories</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Moblies & Accessories">Moblies & Accessories</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Item Type</label>
                    <select
                        name='item_type'
                        value={itemType}
                        onChange={handleItemType}
                        className="w-1/2 border border-gray-300 rounded p-2"
                    >
                        <option value="">Select a Item Type</option>
                        <option value="Laptops">Laptop</option>
                        <option value="Smartphone">Smartphone</option>
                        <option value="Headphone">Headphone</option>
                        <option value="Speaker">Speaker</option>
                        <option value="TV">TV</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={inputs.description}
                        onChange={handleInputChange}
                        className="w-1/2 border border-gray-300 rounded px-4 py-2 h-32"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={inputs.price}
                        onChange={handleInputChange}
                        className="w-1/2 border border-gray-300 rounded px-4 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Image Link</label>
                    <input
                        type="text"
                        name="image"
                        value={inputs.image}
                        onChange={handleInputChange}
                        className="w-1/2 border border-gray-300 rounded px-4 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Published</label>
                    <Switch
                        onChange={handleSwitchChange}
                        checked={inputs.published}
                        onColor="#14B8A6"
                        onHandleColor="#0F766E"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={48}
                        className="react-switch"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-teal-500 hover:bg-teal-700 text-white py-2 rounded-lg px-4"
                >
                    Create Item
                </button>
            </form>
        </div>
    )
}

export default CreateItem;