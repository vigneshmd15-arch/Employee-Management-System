import { useEffect, useState } from "react";
import axios from "axios";

function App() {

    const API_URL = "http://localhost:8080/api/employees";

    const [employees, setEmployees] = useState([]);

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        department: "",
        salary: ""
    });

    const [editingEmployee, setEditingEmployee] = useState(null);
    const [search, setSearch] = useState("");

    // Fetch all employees
    const fetchEmployees = async () => {
        try {
            const response = await axios.get(API_URL);
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
            alert("Unable to fetch employees. Check whether Spring Boot is running.");
        }
    };

    // Load employees when component starts
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Populate form when editing
    useEffect(() => {
        if (editingEmployee) {
            setEmployee({
                name: editingEmployee.name,
                email: editingEmployee.email,
                department: editingEmployee.department,
                salary: editingEmployee.salary
            });
        }
    }, [editingEmployee]);

    // Handle input changes
    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    // Add or Update employee
    const handleSubmit = async (e) => {
        e.preventDefault();

        const employeeData = {
            ...employee,
            salary: Number(employee.salary)
        };

        try {
            if (editingEmployee) {

                await axios.put(
                    `${API_URL}/${editingEmployee.id}`,
                    employeeData
                );

                alert("Employee updated successfully!");

            } else {

                await axios.post(API_URL, employeeData);

                alert("Employee added successfully!");
            }

            resetForm();
            fetchEmployees();

        } catch (error) {
            console.error("Error saving employee:", error);
            alert("Unable to save employee. Please check the backend.");
        }
    };

    // Edit employee
    const handleEdit = (emp) => {
        setEditingEmployee(emp);
    };

    // Delete employee
    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (confirmDelete) {
            try {
                await axios.delete(`${API_URL}/${id}`);

                alert("Employee deleted successfully!");

                if (editingEmployee?.id === id) {
                    resetForm();
                }

                fetchEmployees();

            } catch (error) {
                console.error("Error deleting employee:", error);
                alert("Unable to delete employee.");
            }
        }
    };

    // Reset form
    const resetForm = () => {
        setEmployee({
            name: "",
            email: "",
            department: "",
            salary: ""
        });

        setEditingEmployee(null);
    };

    // Search employees
    const filteredEmployees = employees.filter((emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.department.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="container">

            {/* Header */}
            <header className="header">
                <h1>Employee Management System</h1>
                <p>Manage your employees efficiently</p>
            </header>

            {/* Dashboard Cards */}
            <div className="dashboard-cards">

                <div className="card">
                    <h3>Total Employees</h3>
                    <h2>{employees.length}</h2>
                </div>

                <div className="card">
                    <h3>Departments</h3>
                    <h2>
                        {new Set(employees.map(emp => emp.department)).size}
                    </h2>
                </div>

                <div className="card">
                    <h3>Average Salary</h3>
                    <h2>
                        ₹{
                            employees.length > 0
                                ? Math.round(
                                    employees.reduce(
                                        (total, emp) => total + Number(emp.salary || 0),
                                        0
                                    ) / employees.length
                                )
                                : 0
                        }
                    </h2>
                </div>

            </div>

            {/* Employee Form */}
            <div className="form-container">

                <h2>
                    {editingEmployee ? "Update Employee" : "Add New Employee"}
                </h2>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Employee Name"
                        value={employee.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="department"
                        placeholder="Enter Department"
                        value={employee.department}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="salary"
                        placeholder="Enter Salary"
                        value={employee.salary}
                        onChange={handleChange}
                        min="0"
                        required
                    />

                    <div className="form-buttons">

                        <button type="submit" className="submit-btn">
                            {editingEmployee ? "Update Employee" : "Add Employee"}
                        </button>

                        {editingEmployee && (
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                </form>

            </div>

            {/* Employee List */}
            <div className="table-container">

                <h2>Employee List</h2>

                {/* Search */}
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by name, email or department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <table>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Salary</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredEmployees.length > 0 ? (

                            filteredEmployees.map((emp) => (

                                <tr key={emp.id}>

                                    <td>{emp.id}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.department}</td>
                                    <td>₹{emp.salary}</td>

                                    <td>

                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(emp)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(emp.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>
                                <td colSpan="6" className="no-data">
                                    No employees found
                                </td>
                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default App;