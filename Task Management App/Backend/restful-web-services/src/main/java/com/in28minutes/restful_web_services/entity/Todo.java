package com.in28minutes.restful_web_services.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
public class Todo {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String username;
	private String description;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date targetDate;
	private boolean done;
	private boolean movedToTracker;
	
	public Todo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Todo(Long id, String username, String description, User user, Date targetDate, boolean done,
			boolean movedToTracker) {
		super();
		this.id = id;
		this.username = username;
		this.description = description;
		this.user = user;
		this.targetDate = targetDate;
		this.done = done;
		this.movedToTracker = movedToTracker;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Date getTargetDate() {
		return targetDate;
	}

	public void setTargetDate(Date targetDate) {
		this.targetDate = targetDate;
	}

	public boolean isDone() {
		return done;
	}

	public void setDone(boolean done) {
		this.done = done;
	}

	public boolean isMovedToTracker() {
		return movedToTracker;
	}

	public void setMovedToTracker(boolean movedToTracker) {
		this.movedToTracker = movedToTracker;
	}

	@Override
	public String toString() {
		return "Todo [id=" + id + ", username=" + username + ", description=" + description + ", user=" + user
				+ ", targetDate=" + targetDate + ", done=" + done + ", movedToTracker=" + movedToTracker + "]";
	}

	
	
	
}