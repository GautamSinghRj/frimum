package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Honey_singh;



public interface Honey_repo extends JpaRepository<Honey_singh,Long> {

	@Query(value = "SELECT * FROM  honey_singh", nativeQuery = true)
    List<Honey_singh> findAll();
}
