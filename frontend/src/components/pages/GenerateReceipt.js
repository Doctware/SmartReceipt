import React, { useState } from "react";
import Receipt from "./Receipt";
import "./GenerateReceipt.css";

const GenerateReceipt = () => {
    const [formData, setFormData] = useState({
        buyerName: "",
        productName: "",
        amount: "",
        description: "",
        address: "",
        sellerId: "", // Assuming seller ID will be passed or fetched
    });

    const [receiptData, setReceiptData] = useState(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Construct payload for the backend
        const payload = {
            item_name: formData.productName,
            amount: parseFloat(formData.amount),
            address: formData.address,
            business_name: "Smart Receipt Inc.", // Static or dynamic as required
            seller_id: formData.sellerId, // Replace with actual seller ID
        };

        try {
            // API call to create receipt
            const response = await fetch("http://localhost:5000/receipts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass JWT if required
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create receipt.");
            }

            // Store receipt data
            setReceiptData(data);
            setShowReceipt(true);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleLockReceipt = async () => {
        if (!receiptData || !receiptData.access_code) {
            setError("No receipt available to lock.");
            return;
        }

        try {
            // API call to lock the receipt
            const response = await fetch(
                `http://localhost:5000/receipts/lock/${receiptData.access_code}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Pass JWT if required
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to lock receipt.");
            }

            alert("Receipt locked successfully!");
        } catch (err) {
            setError(err.message);
        }
    };

    const handleBack = () => {
        setShowReceipt(false);
        setReceiptData(null);
    };

    return (
        <div className="generate-receipt">
            {showReceipt ? (
                <div>
                    <Receipt
                        buyer={formData.buyerName}
                        productName={formData.productName}
                        amount={parseFloat(formData.amount)}
                        description={formData.description}
                        onBack={handleBack}
                    />
                    <button onClick={handleLockReceipt} className="btn btn-lock">
                        Lock Receipt
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>Generate Receipt</h2>
                    {error && <p className="error">{error}</p>}

                    <label>Buyer's Name</label>
                    <input
                        type="text"
                        name="buyerName"
                        value={formData.buyerName}
                        onChange={handleChange}
                        required
                    />

                    <label>Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        required
                    />

                    <label>Amount</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                    />

                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>

                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <label>Seller ID</label>
                    <input
                        type="text"
                        name="sellerId"
                        value={formData.sellerId}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Generate</button>
                </form>
            )}
        </div>
    );
};

export default GenerateReceipt;
