package com.example.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.model.Employee;
import com.example.repository.EmployeeRepository;

@Service
public class EmployeeService {
	@Autowired
	private EmployeeRepository employeeRepo;
	
	//Find all employee
	public List<Employee> showAll(){
		return employeeRepo.findAll();
	}

	public void removeEmployee(Long id) {
		employeeRepo.deleteById(id);
	}
	
	public Employee updateEmployee(Long id, Employee employeeDetails) {
	    Employee existingEmployee = employeeRepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Employee not found with id " + id));

	    // update fields
	    existingEmployee.setName(employeeDetails.getName());
	    existingEmployee.setEmail(employeeDetails.getEmail());
	    existingEmployee.setPosition(employeeDetails.getPosition());

	    return employeeRepo.save(existingEmployee);
	}

	public Employee addEmployee(Employee employeeDetails) {
		Employee status=employeeRepo.save(employeeDetails);
		return status;
	}

}
