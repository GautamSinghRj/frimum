package com.musicapp.music_backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Bruno_mars {
	
	@Id
	private long id;
	private String name;
	private String length;
	private String link;	
	
	public long getId() {
		return id;
	}
	
	public void setId(long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getLength() {
		return length;
	}
	
	public void setLength(String length) {	
		this.length = length;
	}
	
	public String getLink() {
		return link;
	}
	
	public void setLink(String link) {
		this.link = link;
	}

	@Override
	public String toString() {
		return "Bruno_mars [id=" + id + ", name=" + name + ", length=" + length + ", link=" + link + "]";
	}
	
}
