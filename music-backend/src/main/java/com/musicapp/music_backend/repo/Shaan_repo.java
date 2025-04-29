package com.musicapp.music_backend.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Shaan;

public interface Shaan_repo extends JpaRepository<Shaan,Long> {

	@Query(value = "SELECT * FROM  shaan", nativeQuery = true)
    List<Shaan> findAll();
}
