import React, { useState } from "react";
import "./Auth.css"; // Optional for custom styles
import logo from "./assets/logo.jpg"; // Correctly importing the logo
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLoginPage = async (event) => {
        event.preventDefault(); // Prevent form submission

        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Save the JWT token in localStorage or sessionStorage
                localStorage.setItem("accessToken", data.access_token);
                // Navigate to the user dashboard
                navigate("/UserDashboard");
            } else {
                // Handle invalid credentials or errors
                const errorData = await response.json();
                setErrorMessage(errorData.error || "Login failed. Please try again.");
            }
        } catch (error) {
            // Handle network errors
            setErrorMessage("An error occurred while connecting to the server. Please try again.");
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100">
                {/* Left Side: Logo */}
                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center bg-light">
                    <img
                        src={logo}
                        alt="Logo"
                        className="img-fluid mb-4"
                        style={{ maxWidth: "200px" }}
                    />
                    <h1 className="text-primary">Smart Receipt</h1>
                </div>

                {/* Right Side: Login Form */}
                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <h2 className="mb-4">Login</h2>
                    <form className="w-75" onSubmit={handleLoginPage}>
                        {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                                {errorMessage}
                            </div>
                        )}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </form>
                    <p>
                        Don't have an account? <a href="/SignUp">Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
