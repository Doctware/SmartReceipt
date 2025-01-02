import React, { useState } from "react";
import Receipt from "./Receipt";
import "./GenerateReceipt.css";

const GenerateReceipt = () => {
    const [formData, setFormData] = useState({
        buyerName: "",
        productName: "",
        amount: "",
        description: "",
    });

    const [showReceipt, setShowReceipt] = useState(false);
    // const [seller, setSeller] = useState({
    //     name: "John Doe", // Mock data; replace with fetched data
    //     email: "john.doe@example.com",
    // });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Here, you would typically send data to the backend
        setShowReceipt(true); // Show receipt after submitting
    };

    const handleBack = () => {
        setShowReceipt(false);
    };

    return (
        <div className="generate-receipt">
            {showReceipt ? (
                <Receipt
                    buyer={formData.buyerName}
                    // seller={`${seller.name} (${seller.email})`}
                    productName={formData.productName}
                    amount={parseFloat(formData.amount)}
                    description={formData.description}
                    onBack={handleBack}
                />
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2>Generate Receipt</h2>

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

                    <button type="submit">Generate</button>
                </form>
            )}
        </div>
    );
};

export default GenerateReceipt;
