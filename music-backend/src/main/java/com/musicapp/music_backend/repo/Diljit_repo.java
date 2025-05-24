package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Diljit_dosanjh;


public interface Diljit_repo  extends JpaRepository<Diljit_dosanjh,Long>{

	@Query(value = "SELECT * FROM  diljit_dosanjh", nativeQuery = true)
    List<Diljit_dosanjh> findAll();
}
