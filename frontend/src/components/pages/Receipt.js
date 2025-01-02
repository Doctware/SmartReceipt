import React from "react";
import "./GenerateReceipt.css"; // Reuse CSS
import logo from "../assets/logo.jpg"; // Ensure correct path for the logo

const Receipt = ({ buyer, seller, productName, amount, description, onBack }) => {
    const generateSerialNumber = () => {
        return `SR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    const serialNumber = generateSerialNumber();

    return (
        <div className="receipt-container">
            <div className="receipt-header">
                <img src={logo} alt="System Logo" className="receipt-logo" />
                <h1>SmartChurch</h1>
                <p>Receipt Serial: <strong>{serialNumber}</strong></p>
            </div>
            <div className="receipt-body">
                <p><strong>Date:</strong> {formattedDate}</p>
                <p><strong>Time:</strong> {formattedTime}</p>
                <p><strong>Buyer:</strong> {buyer}</p>
                <p><strong>Seller:</strong> {seller}</p>
                <p><strong>Product Name:</strong> {productName}</p>
                <p><strong>Amount:</strong> ${amount.toFixed(2)}</p>
                <p><strong>Description:</strong> {description}</p>
            </div>
            <div className="receipt-footer">
                <p>Thank you for your purchase!</p>
                <p>Powered by SmartChurch</p>
            </div>
            <button onClick={onBack}>Back</button>
        </div>
    );
};

export default Receipt;
