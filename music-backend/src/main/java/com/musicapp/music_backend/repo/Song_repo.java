package com.musicapp.music_backend.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.musicapp.music_backend.entities.Song;

public interface Song_repo extends JpaRepository<Song,Long> {

	Song findByNameIgnoreCase(String name);
	List<Song> findAll();
}
