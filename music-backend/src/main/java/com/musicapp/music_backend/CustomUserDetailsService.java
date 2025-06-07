package com.musicapp.music_backend;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.musicapp.music_backend.entities.Users;
import com.musicapp.music_backend.repo.User_repo;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private User_repo user_Repo;
	
	@Override
	public UserDetails loadUserByUsername(String username)throws UsernameNotFoundException  {
		Users user=user_Repo.findByUsername(username)
				.orElseThrow(()-> new UsernameNotFoundException("User not found"+username));
		return new User(
				user.getUsername(),
				user.getPassword(),
				new ArrayList<>());
	}
}
