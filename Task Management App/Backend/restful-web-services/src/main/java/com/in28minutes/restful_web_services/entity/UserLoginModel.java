package com.in28minutes.restful_web_services.entity;

public class UserLoginModel {
  private String username;
  private String password;
  
  public UserLoginModel() {
	  super();
	// TODO Auto-generated constructor stub
  }

public UserLoginModel(String username, String password) {
	super();
	this.username = username;
	this.password = password;
}

public String getUsername() {
	return username;
}

public void setUsername(String username) {
	this.username = username;
}

public String getPassword() {
	return password;
}

public void setPassword(String password) {
	this.password = password;
}

@Override
public String toString() {
	return "UserLoginModel [username=" + username + ", password=" + password + "]";
}
  
  
  
  
}
