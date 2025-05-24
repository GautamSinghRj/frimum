package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Udit_narayan;



public interface Udit_repo  extends JpaRepository<Udit_narayan,Long>{

	@Query(value = "SELECT * FROM  udit_narayan", nativeQuery = true)
    List<Udit_narayan> findAll();
}
