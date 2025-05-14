import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editedUser, setEditedUser] = useState({});
    const { searchQuery } = useOutletContext();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

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

    const filteredUsers = users.filter((user) => {
        const q = searchQuery.toLowerCase();
        return (
            user.fullname.toLowerCase().includes(q) ||
            user.email.toLowerCase().includes(q) ||
            user.phone?.toLowerCase().includes(q)
        );
    });

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditedUser({ ...users[index] });
    };

    const handleCancel = () => {
        setEditIndex(null);
        setEditedUser({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`${baseURL}/admin/users/${editedUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(editedUser),
            });

            if (!response.ok) throw new Error("Failed to update user");

            const updated = [...users];
            updated[editIndex] = editedUser;
            setUsers(updated);
            setEditIndex(null);
        } catch (error) {
            console.error("Update user failed:", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            const response = await fetch(`${baseURL}/admin/users/${id}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) throw new Error("Failed to delete user");

            setUsers(users.filter((user) => user._id !== id));
        } catch (error) {
            console.error("Delete user failed:", error);
        }
    };

    return (
        <div className="admin-users">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            {editIndex === index ? (
                                <>
                                    <td><input name="fullname" value={editedUser.fullname} onChange={handleChange} /></td>
                                    <td><input name="email" value={editedUser.email} onChange={handleChange} /></td>
                                    <td><input name="phone" value={editedUser.phone || ""} onChange={handleChange} /></td>
                                    <td className="admin-btn-group">
                                        <button onClick={handleSave}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{user.fullname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone || "-"}</td>
                                    <td className="admin-btn-group">
                                        <button onClick={() => handleEdit(index)}>Edit</button>
                                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
