import React, { useState } from "react";
import "./Auth.css"; // Use the same CSS for Login and SignUp
import logo from "./assets/logo.jpg"; // Correctly importing the logo

const SignUp = () => {
    const [userType, setUserType] = useState("individual"); // "individual" or "business"
    const [businessName, setBusinessName] = useState("");
    const [businessLocation, setBusinessLocation] = useState("");
    const [businessPOBox, setBusinessPOBox] = useState("");
    const [ownerDetails, setOwnerDetails] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [homeAddress, setHomeAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userType === "business") {
            if (!businessName || !businessLocation || !businessPOBox || !ownerDetails) {
                setError("All business fields are required");
                return;
            }
        } else if (userType === "individual") {
            if (!firstName || !lastName || !emailAddress || !homeAddress || !password || !confirmPassword) {
                setError("All fields are required");
                return;
            }
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        alert("Registration successful");
        setError("");
    };

    return (
        <div className="auth-container">
            <div className="auth-logo">
                <img src={logo} alt="Logo" className="img-fluid" />
                <h1 style={{ textAlign: "center" }}>Smart Receipt</h1>
            </div>
            <div className="auth-form">
                <h2>Sign Up</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userType">I am signing up as:</label>
                        <select
                            id="userType"
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                        >
                            <option value="individual">Individual</option>
                            <option value="business">Business</option>
                        </select>
                    </div>

                    {userType === "business" && (
                        <>
                            <div className="form-group">
                                <label htmlFor="businessName">Business Name</label>
                                <input
                                    type="text"
                                    id="businessName"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    placeholder="Enter your business name"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="businessLocation">Business Location</label>
                                <input
                                    type="text"
                                    id="businessLocation"
                                    value={businessLocation}
                                    onChange={(e) => setBusinessLocation(e.target.value)}
                                    placeholder="Enter your business location"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="businessPOBox">PO Box</label>
                                <input
                                    type="text"
                                    id="businessPOBox"
                                    value={businessPOBox}
                                    onChange={(e) => setBusinessPOBox(e.target.value)}
                                    placeholder="Enter your PO Box"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="ownerDetails">Owner's Details</label>
                                <input
                                    type="text"
                                    id="ownerDetails"
                                    value={ownerDetails}
                                    onChange={(e) => setOwnerDetails(e.target.value)}
                                    placeholder="Enter owner's details"
                                />
                            </div>
                        </>
                    )}

                    {userType === "individual" && (
                        <>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Enter your first name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Enter your last name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="emailAddress">Email Address</label>
                                <input
                                    type="email"
                                    id="emailAddress"
                                    value={emailAddress}
                                    onChange={(e) => setEmailAddress(e.target.value)}
                                    placeholder="Enter your email address"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="homeAddress">Home Address</label>
                                <input
                                    type="text"
                                    id="homeAddress"
                                    value={homeAddress}
                                    onChange={(e) => setHomeAddress(e.target.value)}
                                    placeholder="Enter your home address"
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                        />
                    </div>

                    <button type="submit" className="auth-button">Sign Up</button>
                </form>
                <p>
                    Have an account? <a href="/LoginPage">Login</a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
