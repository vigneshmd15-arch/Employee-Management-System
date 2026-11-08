import { useState } from "react";

function EmployeeForm({ onAdd }) {

    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        department: "",
        salary: ""
    });

    const handleChange = (e) => {

        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onAdd({
            ...employee,
            salary: Number(employee.salary)
        });

        setEmployee({
            name: "",
            email: "",
            department: "",
            salary: ""
        });
    };

    return (

        <form onSubmit={handleSubmit}>

            <h2>Add Employee</h2>

            <input
                type="text"
                name="name"
                placeholder="Employee Name"
                value={employee.name}
                onChange={handleChange}
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={employee.email}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="department"
                placeholder="Department"
                value={employee.department}
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={employee.salary}
                onChange={handleChange}
                required
            />

            <button type="submit">
                Add Employee
            </button>

        </form>
    );
}

export default EmployeeForm;