import React, { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState([]);
    const baseURL = import.meta.env.VITE_API_BASE_URL

    useEffect(() => {
        fetch(`${baseURL}/admin/users`, {
            credentials: "include"
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch users");
                return res.json();
            })
            .then((data) => setUsers(data))
            .catch((err) => console.error("Fetch users failed:", err));
    }, []);

    return (
        <div className="admin-users">
            <button className="add-btn">Add New</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td className="admin-btn-group">
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
