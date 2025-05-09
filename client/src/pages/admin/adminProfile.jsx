import React from "react";
import "../../css/admin/admin.css"

const AdminProfile = () => {
    return (
        <div className="admin-profile-container">
            <div className="admin-profile-card">
                <img
                    src={adminData.profileImage}
                    alt="Profile"
                    className="admin-profile-image"
                />
                <h2>{adminData.fullName}</h2>
                <p><strong>Phone:</strong> {adminData.phone}</p>
                <p><strong>UserID:</strong> {adminData.userId}</p>
            </div>
        </div>
    );
};

export default AdminProfile;
