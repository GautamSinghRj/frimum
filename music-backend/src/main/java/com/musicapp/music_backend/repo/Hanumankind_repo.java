package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.Hanumankind;



public interface Hanumankind_repo  extends JpaRepository<Hanumankind,Long>{

	@Query(value = "SELECT * FROM  hanumankind", nativeQuery = true)
    List<Hanumankind> findAll();
}
