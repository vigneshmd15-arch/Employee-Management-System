function EmployeeList({ employees, onEdit, onDelete }) {

    return (

        <div>

            <h2>Employee List</h2>

            <table border="1">

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

                    {employees.map((emp) => (

                        <tr key={emp.id}>

                            <td>{emp.id}</td>
                            <td>{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.department}</td>
                            <td>{emp.salary}</td>

                            <td>

                                <button onClick={() => onEdit(emp)}>
                                    Edit
                                </button>

                                <button onClick={() => onDelete(emp.id)}>
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default EmployeeList;