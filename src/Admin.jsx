import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './CSS/Admin.css';

// Components
import Sidebar from "./components/adminSidebar";
import Header from "./components/adminHeader";

// Pages
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Events from "./pages/Events";


export default function AdminPages() {
    return (
        <Router>
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
        </Router>
    );
}

