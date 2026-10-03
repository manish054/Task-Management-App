package com.in28minutes.restful_web_services.entity;


public class UserLoginResponse {
	private String username;
	private boolean authenticated;
	private String jwtToken;
	public UserLoginResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserLoginResponse(String username, boolean authenticated, String jwtToken) {
		super();
		this.username = username;
		this.authenticated = authenticated;
		this.jwtToken = jwtToken;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public boolean isAuthenticated() {
		return authenticated;
	}
	public void setAuthenticated(boolean authenticated) {
		this.authenticated = authenticated;
	}
	public String getJwtToken() {
		return jwtToken;
	}
	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}
	@Override
	public String toString() {
		return "UserLoginResponse [username=" + username + ", authenticated=" + authenticated + ", jwtToken=" + jwtToken
				+ "]";
	}
	
	
}
