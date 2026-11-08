import axios from "axios";

const API = "http://localhost:8080/api/employees";

export const getEmployees = () => {
    return axios.get(API);
};

export const addEmployee = (employee) => {
    return axios.post(API, employee);
};

export const updateEmployee = (id, employee) => {
    return axios.put(`${API}/${id}`, employee);
};

export const deleteEmployee = (id) => {
    return axios.delete(`${API}/${id}`);
};