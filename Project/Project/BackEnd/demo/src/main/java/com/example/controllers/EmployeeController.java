package com.example.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.Employee;
import com.example.service.EmployeeService;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
	@Autowired
	private EmployeeService employeeService;
	
	//To get all employees
	@GetMapping("/showall")
	public ResponseEntity<List<Employee>> getAll() {
        List<Employee> list = employeeService.showAll();
        return ResponseEntity.ok(list);
    }
	
	//delete employee
	@DeleteMapping("/remove/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable Long id) {
	    employeeService.removeEmployee(id);
	    return ResponseEntity.ok("Employee with id " + id + " deleted successfully.");
	}
	
	//update employee
	@PutMapping("/update/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails) {
	    Employee updatedEmployee = employeeService.updateEmployee(id, employeeDetails);
	    return ResponseEntity.ok(updatedEmployee);
	}
	
	//add new employee
	@PostMapping("/addnew")
	public ResponseEntity<Employee> addEmployee(@RequestBody Employee employeeDetails) {
	    Employee saved = employeeService.addEmployee(employeeDetails);
	    return ResponseEntity.ok(saved);
	}

}
