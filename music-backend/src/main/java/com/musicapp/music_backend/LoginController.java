package com.musicapp.music_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.musicapp.music_backend.entities.Users;
import com.musicapp.music_backend.repo.User_repo;

@RestController
public class LoginController {

	@Autowired
	User_repo user;
	
	@PostMapping("/login")
	public Users addOrGetUser(@RequestBody Users userobj) {
	    Users existingUser = user.findByEmail(userobj.getEmail());
	    if (existingUser != null) return existingUser;
	    return user.save(userobj);

	}
	
	
}
