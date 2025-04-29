package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Pritam;



public interface Pritam_repo extends JpaRepository<Pritam,Long> {

	@Query(value = "SELECT * FROM  pritam", nativeQuery = true)
    List<Pritam> findAll();
}
