import React from "react";
import logo from "./assets/logo.jpg";
import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <img src={logo} alt="Smart Receipt Logo" className="logo" />
            <nav>
                <ul>
                    <li><a href="/">Dashboard</a></li>
                    <li><a href="/generate-receipt">Generate Receipt</a></li>
                    <li><a href="/receipt-history">History</a></li>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
