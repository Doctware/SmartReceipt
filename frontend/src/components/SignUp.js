import React, { useState } from "react";
import "./Auth.css"; // Use the same CSS for Login and SignUp
import "./SignUp.css"
import axios from "axios";
import logo from "./assets/logo.jpg"; // Correctly importing the logo

const SignUp = () => {
    const [fullName, setFullName] = useState(""); // Full name
    const [businessName, setBusinessName] = useState(""); // Business name (optional)
    const [address, setAddress] = useState(""); // Address
    const [poBox, setPoBox] = useState(""); // PO Box (optional)
    const [email, setEmail] = useState(""); // Email address
    const [password, setPassword] = useState(""); // Password
    const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match ");
            return;
        }

        const userData = {
            full_name: fullName,
            business_name: businessName || null, // Nullable field
            address: address,
            po_box: poBox || null, // Nullable field
            email: email,
            passwd: password,
        };

        try {
            const response = await axios.post("http://127.0.0.1:5003/api/v1s.0/seller/register", userData, {
                headers: { "Content-Type": "application/json" },
            });
            alert(response.data.message); // Show success message
        } catch (error) {
		if (error.response && error.response.data) {
			alert(error.response.data.error)
		} else {
			alert("Ow!! unknown error are you connected!?")
		}
            setError("Failed to register. Please try again.");
        }
    };

    return (
        <div className="auth-form">
            <form onSubmit={handleSubmit} className="auth-form">
                <img src={logo} alt="Logo" className="auth-logo" />
                <h2>Register and Be a Smart User</h2>
                
                {/* Full Name */}
                <div className="form-group">
                    <label>
                        Full Name:
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </label>
                </div>

                {/* Business Name (Optional) */}
                <div className="form-group">
                    <label>
                        Business Name (Optional):
                        <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                        />
                    </label>
                </div>

                {/* Address */}
                <div className="form-group">
                    <label>
                        Address:
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                </div>

                {/* PO Box (Optional) */}
                <div className="form-group">
                    <label>
                        PO Box (Optional):
                        <input
                            type="text"
                            value={poBox}
                            onChange={(e) => setPoBox(e.target.value)}
                        />
                    </label>
                </div>

                {/* Email */}
                <div className="form-group">
                    <label>
                        Email Address:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>

                {/* Password */}
                <div className="form-group">
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>

                {/* Confirm Password */}
                <div className="form-group">
                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                </div>

                {/* Error Message */}
                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="auth-button">Sign Up</button>
            </form>
            <p className="signup-button">
                Already have an account? <a href="/LoginPage" className="login-link">Login</a>
            </p>
        </div>
    );
};

export default SignUp;
