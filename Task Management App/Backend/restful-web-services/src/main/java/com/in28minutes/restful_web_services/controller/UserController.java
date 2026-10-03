package com.in28minutes.restful_web_services.controller;

import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.in28minutes.restful_web_services.entity.User;
import com.in28minutes.restful_web_services.entity.UserLoginModel;
import com.in28minutes.restful_web_services.entity.UserLoginResponse;
import com.in28minutes.restful_web_services.repo.UserRepo;
import com.in28minutes.restful_web_services.service.JwtService;
import com.in28minutes.restful_web_services.service.UserService;
import com.in28minutes.restful_web_services.service.VerificationTokenService;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserRepo userRepo;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	JwtService jwtService;
	
	@Autowired
	VerificationTokenService verificationTokenService;
	
	@GetMapping("/users-list")
	public List<User> getAllUsers(){
		return userService.getAllUsers();
	}
	
	@PostMapping("/register")
	public User register(@RequestBody User user) {
		System.out.println("user.toString()--"+user.toString());
		User savedUser = userService.registerUser(user);
		verificationTokenService.generateVerificaitonToken(savedUser);
		return savedUser;
	}
	
	@GetMapping("/verify")
	public String verifyMail(@RequestParam String token) {
		System.out.println("token***"+token);
		return verificationTokenService.verifyToken(token);
	}
	
	@PostMapping("/login")
	public UserLoginResponse login(@RequestBody UserLoginModel userModel) {
			User user = userRepo.findByName(userModel.getUsername()).get();
			UserLoginResponse response = new UserLoginResponse();
			System.out.println("Here--");
			if(user.isEnabled()) {
				Authentication authentication = authenticationManager.authenticate(
						new UsernamePasswordAuthenticationToken(userModel.getUsername(), userModel.getPassword()));
				System.out.println(authentication.isAuthenticated());
				if(authentication.isAuthenticated()) {
					String jwtToken = jwtService.generateToken(userModel.getUsername());
					response.setUsername(userModel.getUsername());
					response.setAuthenticated(true);
					response.setJwtToken(jwtToken);
					return response;
				}
			}
			return response;
	}
	
}
