package com.in28minutes.restful_web_services.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.in28minutes.restful_web_services.entity.User;
import com.in28minutes.restful_web_services.entity.VerificationToken;
import com.in28minutes.restful_web_services.repo.UserRepo;
import com.in28minutes.restful_web_services.repo.VerificationTokenRepo;

@Service
public class VerificationTokenService {
	
	@Autowired
	EmailService emailService;
	
	@Autowired
	VerificationTokenRepo verificationTokenRepo;
	
	@Autowired
	UserRepo userRepo;
	
	public void generateVerificaitonToken(User user) {
		VerificationToken verificationToken = new VerificationToken();
		String token = UUID.randomUUID().toString();
		verificationToken.setToken(token);
		verificationToken.setUser(user);
		verificationToken.setExpiryDate(LocalDateTime.now().plusMinutes(60));
		verificationTokenRepo.save(verificationToken);
		System.out.println(verificationToken.toString());
		emailService.sendVerificationMail(user.getEmail(), token);
	}
	
	public String verifyToken(String token) {
		VerificationToken verificationToken = verificationTokenRepo.findByToken(token);
		if(token == null) {
			System.out.println("Invalid Token");
			return "Invalid Token";
		}
		
		if(verificationToken.getExpiryDate().isAfter(LocalDateTime.now())) {
			User user = verificationToken.getUser();
			user.setEmailVerified(true);
			user.setEnabled(true);
			System.out.println(user.toString());
			userRepo.save(user);
			System.out.println("Account Verified");
			return "Account Verified";
		}
		System.out.println("Error !!! Sign up again");
		return "Error !!! Sign up again";
	}
}
