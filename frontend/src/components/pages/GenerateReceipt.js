import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas"; // Ensure this package is installed
import "./GenerateReceipt.css";

const GenerateReceipt = () => {
    const sigCanvas = useRef(null);
    const [formData, setFormData] = useState({
        buyer_name: "",
        item_name: "",
        amount: "",
        description: "",
        address: "",
        seller_id: "",
        buyer_signature: "", // Signature will be stored here as base64 string
    });
    const [receiptData, setReceiptData] = useState(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle signature change
    const handleSignature = () => {
        const signature = sigCanvas.current.toDataURL("image/png"); // Base64 encoded image
        setFormData({ ...formData, buyer_signature: signature });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        // Construct payload for the backend
        const payload = {
            item_name: formData.item_name,
            amount: parseFloat(formData.amount), // Backend expects a float
            description: formData.description || null,
            address: formData.address,
            buyer_name: formData.buyer_name,
            buyer_signature: formData.buyer_signature || null, // Include signature
            seller_id: formData.seller_id,
            business_name: "Smart Receipt Inc.", // Static or dynamic as required
        };

        try {
            // API call to create receipt
            const response = await fetch("http://localhost:5003/api/v1s.0/receipt/create", {
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
            setReceiptData(data.receipt); // Use `receipt` from the backend response
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
                `http://localhost:5003/api/v1s.0/receipt/lock/${receiptData.access_code}`,
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
                    <h3>Receipt</h3>
                    <div>Item Name: {receiptData.item_name}</div>
                    <div>Amount: ${receiptData.amount}</div>
                    <div>Description: {receiptData.description}</div>
                    <div>Address: {receiptData.address}</div>
                    <div>Buyer Name: {receiptData.buyer_name}</div>
                    {receiptData.buyer_signature && (
                        <div>
                            <h4>Buyer's Signature</h4>
                            <img src={receiptData.buyer_signature} alt="Buyer's Signature" width="200" />
                        </div>
                    )}
                    <button onClick={handleLockReceipt}>Lock Receipt</button>
                    <button onClick={handleBack}>Back</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>Generate Receipt</h2>
                    {error && <p className="error">{error}</p>}

                    <label>Buyer's Name</label>
                    <input
                        type="text"
                        name="buyer_name"
                        value={formData.buyer_name}
                        onChange={handleChange}
                        required
                    />

                    <label>Item Name</label>
                    <input
                        type="text"
                        name="item_name"
                        value={formData.item_name}
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
                        name="seller_id"
                        value={formData.seller_id}
                        onChange={handleChange}
                        required
                    />

                    <div>
                        <h3>Signature</h3>
                        <SignatureCanvas
                            ref={sigCanvas}
                            penColor="black"
                            canvasProps={{ width: 500, height: 200, className: 'signature-canvas' }}
                        />
                        <button type="button" onClick={handleSignature}>Capture Signature</button>
                    </div>

                    <button type="submit">Generate Receipt</button>
                </form>
            )}
        </div>
    );
};

export default GenerateReceipt;
