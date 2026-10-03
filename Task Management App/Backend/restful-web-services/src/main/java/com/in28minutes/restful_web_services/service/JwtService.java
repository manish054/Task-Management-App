package com.in28minutes.restful_web_services.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
	final String secretKey = "bjhawsyiagxbJNSUIEH12512456haksehgywbgeiycwywgrugeynxw";
	long validity = 1000*60*30; //half an hour
	
	public String generateToken(String userId) {
		Map<String, Object> claims = new HashMap<>();
		
		return Jwts.builder().header().add("type", "jwt")
					.and()
					.claims()
					.add(claims)
					.subject(userId)
					.issuedAt(new Date(System.currentTimeMillis()))
                    .expiration(new Date(System.currentTimeMillis()+validity))
                    .and()
                    .signWith(getKey())
                    .compact();
	}
	
	public SecretKey getKey() {
		byte[] key = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(key);
	}
	
	public String extractUsername(String token) {
		return extractClaims(token, Claims::getSubject);
	}
	
	 public <T> T extractClaims(String token, Function<Claims, T> claimResolver){
	        final Claims claims = extractAllClaims(token);
	        return claimResolver.apply(claims);
	    }
	 
	public Claims extractAllClaims(String token) {
		return Jwts.parser()
					.verifyWith(getKey())
					.build().parseSignedClaims(token)
					.getPayload();
		
	}
	
	public boolean isValidToken(String token, UserDetails user) {
		String username = extractUsername(token);
		if(username.equals(user.getUsername()) && !isTokenExpired(token)) {
			return true;
		}
		return false;
	}
	
	public boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

    public Date extractExpiration(String token){
        return extractClaims(token, Claims::getExpiration);
    }
}
