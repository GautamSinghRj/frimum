package com.musicapp.music_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.musicapp.music_backend.entities.Users;
import com.musicapp.music_backend.repo.User_repo;

@Service
public class UserService {
	
	@Autowired
	private User_repo user_Repo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public Users createUsers(RegisterRequest registerRequest) {
		
		if(registerRequest.getEmail()==null || !isValidEmail(registerRequest.getEmail())) {
			throw new IllegalArgumentException("Valid Email is required");
		}
		if(registerRequest.getUsername()==null || registerRequest.getUsername().trim().isEmpty()){
			throw new IllegalArgumentException("Username can't be empty");
		}
		if(registerRequest.getPassword()==null || registerRequest.getPassword().length()<6)	{
			throw new IllegalArgumentException("Password should be 6 char long");
		}
	
	
		if(existsByUsername(registerRequest.getUsername())) {
		throw new IllegalArgumentException("Username already exists");
			}
	
		if(existsByEmail(registerRequest.getEmail())) {
		throw new IllegalArgumentException("Email already exists");
			}
	
		Users user=new Users();
		user.setEmail(registerRequest.getEmail().trim().toLowerCase());
		user.setUsername(registerRequest.getUsername().trim());
		user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
		return user_Repo.save(user);
	}
	public boolean existsByEmail(String email) {
		return user_Repo.existsByEmail(email);
	}
	public boolean existsByUsername(String username) {
		return user_Repo.existsByUsername(username);
	}
	private Users findByUsername(String username) {
		return user_Repo.findByUsername(username).orElse(null);
	} 
	private Users findByEmail(String email) {
		return user_Repo.findByEmail(email).orElse(null);
	} 
	private boolean isValidEmail(String email) {
		return email!=null &&
			   email.contains("@") &&
			   email.contains(".") &&
			   email.length()>5;
	}

}
