package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Shreya_ghosal;



public interface Shreya_repo  extends JpaRepository<Shreya_ghosal,Long>{

	@Query(value = "SELECT * FROM  shreya_ghosal", nativeQuery = true)
    List<Shreya_ghosal> findAll();
}
