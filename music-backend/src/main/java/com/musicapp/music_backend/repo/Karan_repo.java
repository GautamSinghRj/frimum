package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Karan_auijla;



public interface Karan_repo  extends JpaRepository<Karan_auijla,Long>{

	@Query(value = "SELECT * FROM  karan_auijla", nativeQuery = true)
    List<Karan_auijla> findAll();
}
