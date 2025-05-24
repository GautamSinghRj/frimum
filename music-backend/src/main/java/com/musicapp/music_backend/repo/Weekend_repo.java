package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.The_weekend;



public interface Weekend_repo  extends JpaRepository<The_weekend,Long>{

	@Query(value = "SELECT * FROM  the_weekend", nativeQuery = true)
    List<The_weekend> findAll();
}
