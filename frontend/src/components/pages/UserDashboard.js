import React from "react";
import Footer from "../Footer";
import "./UserDashboard.css";
import Header from "../Header";

const UserDashboard = () => {
    return (
        <div className="dashboard-container">
            <Header></Header>
            <main>
                <div className="welcome-section">
                    <h1>Welcome to Smart Receipt</h1>
                    <p>Manage your receipts securely and efficiently.</p>
                </div>
                <div className="actions-section">
                    <button className="btn generate-btn">Generate New Receipt</button>
                    <button className="btn history-btn">View Receipt History</button>
                </div>
                <section className="analytics-section">
                    <h2>Quick Analytics</h2>
                    <p>Coming Soon: Visualize your sales trends and performance.</p>
                </section>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default UserDashboard;
