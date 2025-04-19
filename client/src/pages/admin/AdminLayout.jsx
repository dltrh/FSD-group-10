import React from "react";
import "../../css/admin.css";
import { Outlet, Router } from "react-router-dom";

// Components
import Sidebar from "../../components/AdminSidebar";
import AdminHeader from "../../components/AdminHeader";

// Pages
import Dashboard from "./Dashboard";
import Users from "./Users";
import Events from "./Events";

export default function AdminLayout() {
    return (
        <div className="app">
            <Sidebar />
            <div className="admin-main-content">
                <AdminHeader />
                <Outlet />
            </div>
        </div>
    );
}
