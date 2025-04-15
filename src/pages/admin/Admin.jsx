import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../../css/admin.css";

// Components
import Sidebar from "../../components/adminSidebar";
import Header from "../../components/adminHeader";

// Pages
import Dashboard from "./Dashboard";
import Users from "./Users";
import Events from "../user/Events";

export default function AdminPages() {
    return (
        <div className="app">
            <Sidebar />
            <div className="main-content">
                <Header />
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/events" element={<Events />} />
                </Routes>
            </div>
        </div>
    );
}
