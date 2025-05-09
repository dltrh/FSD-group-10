import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const [stats, setStats] = useState({ totalUsers: 0, totalEvents: 0 });
    const baseURL = import.meta.env.VITE_API_BASE_URL

    useEffect(() => {
        fetch(`${baseURL}/admin/stats`, {
            method: "GET",
            credentials: "include", // For session or cookie
        })
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error("Failed to fetch stats", err));
    }, []);

    return (
        <div className="dashboard">
            <div className="stat-card">
                <h2>Total users</h2>
                <p>{stats.totalUsers}</p>
            </div>
            <div className="stat-card">
                <h2>Total events</h2>
                <p>{stats.totalEvents}</p>
            </div>
        </div>
    );
};

export default Dashboard;
