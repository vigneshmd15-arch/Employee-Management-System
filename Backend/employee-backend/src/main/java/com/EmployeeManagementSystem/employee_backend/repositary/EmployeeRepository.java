package com.EmployeeManagementSystem.employee_backend.repositary;

import org.springframework.data.jpa.repository.JpaRepository;

import com.EmployeeManagementSystem.employee_backend.entity.Employee;

public interface EmployeeRepository
        extends JpaRepository<Employee, Long> {

}