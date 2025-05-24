package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Happy;

public interface Happy_repo extends JpaRepository<Happy,Long>{

	@Query(value = "SELECT * FROM  happy", nativeQuery = true)
	List<Happy> findAll();

}
