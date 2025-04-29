package com.musicapp.music_backend.repo;



import org.springframework.data.jpa.repository.JpaRepository;



import com.musicapp.music_backend.entities.Users;

public interface User_repo extends JpaRepository<Users,Long>{

	Users findByEmail(String email);

}
