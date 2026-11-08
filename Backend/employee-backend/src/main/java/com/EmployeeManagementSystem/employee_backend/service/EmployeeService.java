package com.EmployeeManagementSystem.employee_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.EmployeeManagementSystem.employee_backend.entity.Employee;
import com.EmployeeManagementSystem.employee_backend.repositary.EmployeeRepository;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    // Get all employees
    public List<Employee> getAllEmployees() {

        return repository.findAll();
    }

    // Get employee by ID
    public Employee getEmployeeById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                new RuntimeException("Employee not found"));
    }

    // Add employee
    public Employee addEmployee(Employee employee) {

        return repository.save(employee);
    }

    // Update employee
    public Employee updateEmployee(Long id, Employee employee) {

        Employee existing = getEmployeeById(id);

        existing.setName(employee.getName());
        existing.setEmail(employee.getEmail());
        existing.setDepartment(employee.getDepartment());
        existing.setSalary(employee.getSalary());

        return repository.save(existing);
    }

    // Delete employee
    public void deleteEmployee(Long id) {

        Employee existing = getEmployeeById(id);

        repository.delete(existing);
    }
}