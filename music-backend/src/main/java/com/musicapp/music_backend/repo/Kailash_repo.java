package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Kailash_kher;



public interface Kailash_repo  extends JpaRepository<Kailash_kher,Long>{

	@Query(value = "SELECT * FROM  kailash_kher", nativeQuery = true)
    List<Kailash_kher> findAll();
}
