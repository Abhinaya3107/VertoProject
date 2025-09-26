import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmployeeList() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [searchTerm, setSearchTerm] = useState(""); // 👈 search state

    useEffect(() => {
        axios.get("http://localhost:8080/employee/showall")
            .then((response) => {
                setEmployees(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Error loading employees");
                setLoading(false);
            });
    }, []);

    const deleteEmployee = (id) => {
        axios
            .delete(`http://localhost:8080/employee/remove/${id}`)
            .then(() => {
                setEmployees(employees.filter((emp) => emp.id !== id));
            })
            .catch((err) => console.error("Delete error:", err));
    };

    const updateEmployee = (emp) => {
        axios
            .put(`http://localhost:8080/employee/update/${emp.id}`, emp)
            .then((response) => {
                setEmployees(
                    employees.map((e) => (e.id === emp.id ? response.data : e))
                );
                setIsEditing(false);
            })
            .catch((err) => console.error("Update error:", err));
    };

    const [isEditing, setIsEditing] = useState(false);
    const [currentEmployee, setCurrentEmployee] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        name: "",
        email: "",
        position: "",
    });

    const editEmployee = (emp) => {
        setCurrentEmployee(emp);
        setIsEditing(true);
    };

    const addEmployee = () => {
        setNewEmployee({ name: "", email: "", position: "" });
        setIsAdding(true);
    };

    const saveEmployee = () => {
        axios
            .post("http://localhost:8080/employee/addnew", newEmployee)
            .then((response) => {
                setEmployees([...employees, response.data]);
                setIsAdding(false);
            })
            .catch((err) => console.error("Add error:", err));
    };

    if (loading) return <p>Loading employees...</p>;
    if (error) return <p>{error}</p>;

    // 👇 Filter employees by searchTerm
    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen p-6 bg-gray-50">
            <h2 className="text-2xl font-semibold mb-4">All Employees</h2>

            {/* 🔍 Search Box */}
            <div className="mb-4 flex gap-2">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border rounded-lg w-1/3"
                />
                <button
                    onClick={() => setSearchTerm("")}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                    Clear
                </button>
            </div>

            <div className="bg-white p-4 rounded-md shadow">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 text-left">ID</th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Position</th>
                            <th className="px-4 py-2 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredEmployees.length > 0 ? (
                            filteredEmployees.map((emp) => (
                                <tr key={emp.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{emp.id}</td>
                                    <td className="px-4 py-2">{emp.name}</td>
                                    <td className="px-4 py-2">{emp.email}</td>
                                    <td className="px-4 py-2">{emp.position}</td>
                                    <td className="px-4 py-2 flex justify-center gap-2">
                                        <button
                                            onClick={() => editEmployee(emp)}
                                            className="px-3 py-1 text-sm rounded-lg bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteEmployee(emp.id)}
                                            className="px-3 py-1 text-sm rounded-lg bg-red-100 text-red-800 hover:bg-red-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-4 text-gray-500">
                                    No employees found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="mt-4 text-right">
                    <button
                        onClick={addEmployee}
                        className="px-3 py-1 rounded bg-red-100 text-red-800"
                    >
                        Add New Employee
                    </button>
                </div>
            </div>
        </div>
    );
}
