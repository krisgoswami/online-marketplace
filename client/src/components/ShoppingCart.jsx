import React from 'react';

const ShoppingCart = ({ items, closePanel }) => {
	return (
		<div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-bold">Shopping Cart</h2>
				<button onClick={closePanel} className="text-blue-500">Close</button>
			</div>
			<div>
				{items.map(item => (
					<div key={item.id} className="flex items-center mb-4">
						<img src={item.image} alt={item.name} className="w-12 h-12 object-cover mr-2" />
						<div>
							<p className="font-bold">{item.name}</p>
							<p>Price: ${item.price}</p>
							<p>Quantity: {item.quantity}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ShoppingCart;
