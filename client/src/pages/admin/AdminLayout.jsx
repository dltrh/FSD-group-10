import React from "react";
import "../../css/admin/admin.css";
import { Outlet, Router } from "react-router-dom";

// Components
import Sidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

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
