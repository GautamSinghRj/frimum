package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Eminem;



public interface Eminem_repo  extends JpaRepository<Eminem,Long>{

	@Query(value = "SELECT * FROM  eminem", nativeQuery = true)
    List<Eminem> findAll();
}
