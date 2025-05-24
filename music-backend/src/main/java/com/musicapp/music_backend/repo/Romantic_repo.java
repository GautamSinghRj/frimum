package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Romantic;

public interface Romantic_repo extends JpaRepository<Romantic,Long> {
	
	@Query(value = "SELECT * FROM  romantic", nativeQuery = true)
	List<Romantic> findAll();

}
