package com.in28minutes.restful_web_services.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	
	@Autowired
	JavaMailSender javaMailSender;
	
	public void sendVerificationMail(String to, String token) {
		
		String link = "http://localhost:8080/verify?token="+token;
		
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject("Todos - Account Verification");
		message.setText("Click Link to verify :- "+link);
		
		javaMailSender.send(message);
	}
}
