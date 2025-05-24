package com.musicapp.music_backend.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.musicapp.music_backend.entities.AR_rahman;




public interface AR_repo  extends JpaRepository<AR_rahman,Long>{

	@Query(value = "SELECT * FROM  ar_rahman", nativeQuery = true)
    List<AR_rahman> findAll();
}
