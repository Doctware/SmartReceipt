import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Perform login logic here if needed
        navigate('/dashboard'); // Navigate to the UserDashboard
    };

    return (
        <div>
            <h1>Welcome to Smart Receipt</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LandingPage;
