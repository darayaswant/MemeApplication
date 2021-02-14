package com.dara1;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Table;

import org.springframework.beans.factory.annotation.Autowired;


@Entity
@Table(name ="meme")
public class Meme{
	@javax.persistence.Id
	@GeneratedValue
	private int id;
	@Autowired
	public int getId() {
		return id;
	}
	private String name;
	private String url;
	private String caption;
	@Autowired
	public String getName() {
		return name;
	}
	@Autowired
	public void setName(String name) {
		this.name = name;
	}
	@Autowired
	public String getUrl() {
		return url;
	}
	@Autowired
	public void setUrl(String url) {
		this.url = url;
	}
	@Autowired
	public String getCaption() {
		return caption;
	}
	@Autowired
	public void setCaption(String caption) {
		this.caption = caption;
	}

}
