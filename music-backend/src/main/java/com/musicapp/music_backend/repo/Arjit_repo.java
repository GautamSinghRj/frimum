package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Arjit_singh;

public interface Arjit_repo extends JpaRepository<Arjit_singh,Long> {

	@Query(value = "SELECT * FROM  arjit_singh", nativeQuery = true)
    List<Arjit_singh> findAll();
}
