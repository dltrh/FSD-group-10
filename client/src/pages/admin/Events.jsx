import React from "react";

const Events = () => {
    return (
        <div className="events">
            <button className="add-btn">Add New</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>eventName</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Organizer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>ABC Company New Year Eve</td>
                        <td>Party</td>
                        <td>24/12/2025</td>
                        <td>Steve J</td>
                        <td className="btn-group">
                            <button>Edit</button>
                            <button>Cancel</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Class Meeting</td>
                        <td>Meeting</td>
                        <td>10/11/2025</td>
                        <td>Cecilia Y</td>
                        <td className="btn-group">
                            <button>Edit</button>
                            <button>Cancel</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Events;