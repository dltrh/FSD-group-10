import React from "react";

const Users = () => {
    return (
        <div className="admin-users">
            <button className="add-btn">Add New</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Steve J</td>
                        <td>Apple123@gmail.com</td>
                        <td>Wsa3141das</td>
                        <td>123456789</td>
                        <td className="admin-btn-group">
                            <button>Edit</button>
                            <button>Cancel</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Daniel T</td>
                        <td>Dani1@gmail.com</td>
                        <td>vuSBF354JH</td>
                        <td>234567890</td>
                        <td className="admin-btn-group">
                            <button>Edit</button>
                            <button>Cancel</button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Cecilia Y</td>
                        <td>CecilY@gmail.com</td>
                        <td>jofa#415u9F</td>
                        <td>098765432</td>
                        <td className="admin-btn-group">
                            <button>Edit</button>
                            <button>Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Users;