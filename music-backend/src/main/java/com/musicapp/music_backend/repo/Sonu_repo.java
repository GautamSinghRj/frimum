package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Sonu_nigam;

public interface Sonu_repo extends JpaRepository<Sonu_nigam,Long> {

	@Query(value = "SELECT * FROM  sonu_nigam", nativeQuery = true)
    List<Sonu_nigam> findAll();
}
