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
        buyer_signature: "",
    });
    const [receiptData, setReceiptData] = useState(null);
    const [showReceipt, setShowReceipt] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignature = () => {
        if (sigCanvas.current.isEmpty()) {
            setError("Please provide a valid signature.");
            return;
        }
        const signature = sigCanvas.current.toDataURL("image/png");
        setFormData({ ...formData, buyer_signature: signature });
        setError(""); // Clear error if signature is valid
    };

    const validatePayload = () => {
        if (
            !formData.buyer_name ||
            !formData.item_name ||
            !formData.amount ||
            !formData.address ||
            !formData.seller_id
        ) {
            setError("All fields are required except description.");
            return false;
        }

        if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
            setError("Amount must be a valid number greater than 0.");
            return false;
        }

        if (!formData.buyer_signature) {
            setError("Buyer signature is required.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validatePayload()) {
            return;
        }

        const payload = {
            item_name: formData.item_name.trim(),
            amount: parseFloat(formData.amount),
            description: formData.description.trim() || null,
            address: formData.address.trim(),
            buyer_name: formData.buyer_name.trim(),
            buyer_signature: formData.buyer_signature,
            seller_id: formData.seller_id.trim(),
        };

        setLoading(true);

        try {
            const response = await fetch("http://localhost:5003/api/v1s.0/receipt/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create receipt.");
            }

            setReceiptData(data.receipt);
            setShowReceipt(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLockReceipt = async () => {
        if (!receiptData || !receiptData.access_code) {
            setError("No receipt available to lock.");
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5003/api/v1s.0/receipt/lock/${receiptData.access_code}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

    const clearSignature = () => {
        sigCanvas.current.clear();
        setFormData({ ...formData, buyer_signature: "" });
    };

    return (
        <div className="generate-receipt">
            {showReceipt ? (
                <div>
                    <h3>Receipt</h3>
                    <div>Item Name: {receiptData.item_name}</div>
                    <div>Amount: ${receiptData.amount.toFixed(2)}</div>
                    <div>Description: {receiptData.description || "N/A"}</div>
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
                        step="0.01"
                        required
                    />

                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
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
                        <button type="button" onClick={clearSignature}>Clear Signature</button>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Generating..." : "Generate Receipt"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default GenerateReceipt;
