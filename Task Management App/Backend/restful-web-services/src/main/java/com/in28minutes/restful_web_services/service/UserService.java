package com.in28minutes.restful_web_services.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.in28minutes.restful_web_services.entity.User;
import com.in28minutes.restful_web_services.entity.UserLoginModel;
import com.in28minutes.restful_web_services.entity.UserPrincipal;
import com.in28minutes.restful_web_services.repo.UserRepo;

@Service
public class UserService implements UserDetailsService{
	
	BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);
	
	@Autowired
	UserRepo userRepo;
	
	public List<User> getAllUsers(){
		return userRepo.findAll();
	}
	
	public User registerUser(User user){
		if(userRepo.findByName(user.getName()).isPresent()) {
			throw new RuntimeException("User already exists");
		}
		
		if(userRepo.findByEmail(user.getEmail()).isPresent()) {
			throw new RuntimeException("Email already registered");
		}
		
		User lUser = new User();
		
		lUser.setName(user.getName());
		lUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
		lUser.setEmail(user.getEmail());
		lUser.setRole(user.getRole());
		lUser.setEnabled(false);
		return userRepo.save(lUser);
	}
	
	public String login(UserLoginModel userModel) {
		return "";
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByName(username).get();
		if(user != null) {
			return new UserPrincipal(user);
		}
		return null;
	}
}
