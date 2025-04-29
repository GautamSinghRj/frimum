package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Energetic;

public interface Energetic_repo extends JpaRepository<Energetic,Long>{

	@Query(value = "SELECT * FROM  energetic", nativeQuery = true)
	List<Energetic> findAll();

}
