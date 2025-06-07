package com.musicapp.music_backend.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.musicapp.music_backend.entities.Users;

@Repository
public interface User_repo extends JpaRepository<Users,Long> {
	
  Optional<Users> findByUsername(String username);
  Optional<Users> findByEmail(String email);
  boolean existsByUsername(String username);
  boolean existsByEmail(String email);
  
}
