import React from "react";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="stat-card">
                <h2>Total users</h2>
                <p>5</p>
            </div>
            <div className="stat-card">
                <h2>Total events</h2>
                <p>3</p>
            </div>
        </div>
    );
};

export default Dashboard;