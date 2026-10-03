package com.in28minutes.restful_web_services.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.in28minutes.restful_web_services.entity.Hello;

@CrossOrigin(origins="http://localhost:4200/")
@RestController
public class Controller {
	
	@GetMapping("/welcome/{message}")
	public Hello welcome(@PathVariable String message) {
		return new Hello("Welcome from Spring Boot !!! "+message);
	}
}
