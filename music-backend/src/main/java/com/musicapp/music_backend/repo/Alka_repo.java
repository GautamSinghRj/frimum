package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Alka_yagnik;

public interface Alka_repo  extends JpaRepository<Alka_yagnik,Long>{

	@Query(value = "SELECT * FROM  alka_yagnik", nativeQuery = true)
    List<Alka_yagnik> findAll();
}
