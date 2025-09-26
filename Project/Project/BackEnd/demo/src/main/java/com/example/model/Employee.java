package com.example.model;

import jakarta.persistence.*;
import lombok.*;

@Entity 
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
	
	@Id
	@Column(name="Employee_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="Employee_Name")
	private String name;
	
	@Column(name="Employee_Email",length = 20,unique = true)
	private String email;
	
	@Column(name="Position",length = 40)
	private String position;
}
