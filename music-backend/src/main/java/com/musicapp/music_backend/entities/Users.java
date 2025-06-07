package com.musicapp.music_backend.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PreUpdate;

@Entity
public class Users {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(unique=true,nullable=false)
	private String username;
	
	@Column(nullable=false)
	private String password;
	
	@Column(unique=true,nullable=false)
	private String email;
	
	private LocalDateTime createdAt;
	
	private LocalDateTime updatedAt;
	
	public Users() {
		this.createdAt=LocalDateTime.now();
		this.updatedAt=LocalDateTime.now();
	}

	public Users(String username, String password, String email) {
		this();
		this.username = username;
		this.password = password;
		this.email = email;
	}
	
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
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
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@PreUpdate
	public void preupdate() {
		this.updatedAt=LocalDateTime.now();
	}
	
}
