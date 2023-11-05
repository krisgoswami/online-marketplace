import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../utils/helper';

const AuctionPage = () => {
    useEffect(() => {
        const socket = io(`http://localhost:3001`); // Connect to the WebSocket server

        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from WebSocket server');
        });

        return () => {
            socket.disconnect(); // Clean up the socket connection when component unmounts
        };
    }, []);

    return (
        <div>
            {/* Render your auction component */}
        </div>
    );
}

export default AuctionPage;