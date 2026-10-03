package com.in28minutes.restful_web_services.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.in28minutes.restful_web_services.service.JwtService;
import com.in28minutes.restful_web_services.service.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter{
	
	@Autowired
	JwtService jwtService;
	
	@Autowired
	UserService userService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		String path = request.getServletPath();
		
		System.out.println("JwtFilter class--");
	    // ✅ Skip JWT for public endpoints
	    if (path.equals("/login") || path.equals("/register") || path.equals("/verify")) {
	    	System.out.println("path--"+path);
	        filterChain.doFilter(request, response);
	        return;
	    }
	    
		String authHeader = request.getHeader("Authorization");
		String token = null;
		String username = null;
		try {
			if(authHeader != null && authHeader.startsWith("Bearer ")) {
				token = authHeader.substring(7);
				username = jwtService.extractUsername(token);
				System.out.println("token---"+token);
				System.out.println("username--"+username);
			}
		}catch(Exception e) {
			System.out.println("Exception--"+e.getMessage());
		}
		System.out.println(SecurityContextHolder.getContext());
		System.out.println("SecurityContextHolder.getContext()==null--"+SecurityContextHolder.getContext()==null);
		if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails user = userService.loadUserByUsername(username);
			System.out.println("jwtService.isValidToken(token, user)--"+jwtService.isValidToken(token, user));
			if(jwtService.isValidToken(token, user)) {
				UsernamePasswordAuthenticationToken authToken = 
						new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
				
				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authToken);
			}
		}
		filterChain.doFilter(request, response);
	}
	
}
