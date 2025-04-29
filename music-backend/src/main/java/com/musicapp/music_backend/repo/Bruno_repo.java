package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Bruno_mars;


public interface Bruno_repo extends JpaRepository<Bruno_mars,Long> {

	@Query(value = "SELECT * FROM  bruno_mars", nativeQuery = true)
    List<Bruno_mars> findAll();
}
