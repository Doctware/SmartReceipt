import React, { useState } from "react";
import "./Auth.css"; // Use the same CSS for Login and SignUp
import axios from "axios";
import logo from "./assets/logo.jpg"; // Correctly importing the logo

const SignUp = () => {
    const [userType, setUserType] = useState("individual"); // "individual" or "business"
    const [fullName, setFullName] = useState(""); // Full name
    const [businessName, setBusinessName] = useState(""); // Business name
    const [address, setAddress] = useState(""); // Address
    const [poBox, setPoBox] = useState(""); // PO Box
    const [email, setEmail] = useState(""); // Email address
    const [password, setPassword] = useState(""); // Password
    const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const userData = {
            full_name: fullName,
            business_name: userType === "business" ? businessName : null,
            address: address,
            po_box: poBox || null, // Nullable field
            email: email,
            passwd: password,
        };

        try {
            const response = await axios.post("http://127.0.0.1:5000/auth/register", userData, {
                headers: { "Content-Type": "application/json" },
            });
            alert(response.data.message); // Show success message
        } catch (error) {
            console.error(error);
            setError("Failed to register. Please try again.");
        }
    };

    return (
        <div className="auth-form">
            <form onSubmit={handleSubmit} className="auth-form">
                <img src={logo} alt="Logo" className="auth-logo" />
                <h2>Register</h2>
                
                {/* User Type */}
                <label>
                    User Type:
                    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="individual">Individual</option>
                        <option value="business">Business</option>
                    </select>
                </label>
                
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
                {userType === "business" && (
                    <div className="form-group">
                        <label>
                            Business Name:
                            <input
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                required
                            />
                        </label>
                    </div>
                )}

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
            <p className="login-option">
                Already have an account? <a href="/LoginPage" className="login-link">Login</a>
            </p>
        </div>
    );
};

export default SignUp;
