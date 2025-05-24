package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Sad;

public interface Sad_repo extends JpaRepository<Sad,Long>{

	@Query(value = "SELECT * FROM  sad", nativeQuery = true)
	List<Sad> findAll();

}
