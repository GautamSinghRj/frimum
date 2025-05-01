package com.musicapp.music_backend.repo;


import org.springframework.data.jpa.repository.JpaRepository;


import com.musicapp.music_backend.entities.Song;

public interface Song_repo extends JpaRepository<Song,Long> {

	Song findByName(String name);
  
}
