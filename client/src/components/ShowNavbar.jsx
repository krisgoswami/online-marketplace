import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ShowNavbar = ({ props }) => {

    const location = useLocation();

    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        if (location.pathname === '/login') {
            setShowNavbar(false);
        }
        setShowNavbar(true);
    }, [location])
    return (
        <div>{showNavbar && props}</div>
    )
}

export default ShowNavbar