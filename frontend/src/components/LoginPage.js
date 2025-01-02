import React from "react";
import "./Auth.css"; // Optional for custom styles
import logo from "./assets/logo.jpg"; // Correctly importing the logo
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLoginPage = (event) => {
        event.preventDefault(); // Prevent form submission
        navigate("/UserDashboard"); // Navigate to the UserDashboard page
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
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
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
