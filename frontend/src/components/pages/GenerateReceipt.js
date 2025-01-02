import React, { useState } from 'react';
import './GenerateReceipt.css';

const GenerateReceipt = () => {
    const [formData, setFormData] = useState({
        buyerName: '',
        productName: '',
        amount: '',
        description: '',
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Receipt Generated!'); // Replace with backend logic
    };

    return (
        <div className="generate-receipt">
            <h2>Generate Receipt</h2>
            <form onSubmit={handleSubmit}>
                <label>Buyer's Name</label>
                <input
                    type="text"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleChange}
                    required
                />

                <label>Product's Name</label>
                <input type="VARCHAR" name='productName' value={formData.recipientName} onChange={handleChange} required />

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

                <label>Date</label>
                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Generate</button>
            </form>
        </div>
    );
};

export default GenerateReceipt;
