package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Song;

public interface Song_repo extends JpaRepository<Song,Long> {

	@Query(value = "SELECT * FROM  song", nativeQuery = true)
	List<Song> findAll();

}
