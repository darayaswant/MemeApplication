package com.dara1;

import org.springframework.data.repository.CrudRepository;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.Query;

public interface MemeRepo extends CrudRepository<Meme,Integer> {
@Query(value ="SELECT * FROM (SELECT * FROM meme ORDER BY id DESC LIMIT 100) sub ORDER BY id ASC",nativeQuery = true)
public ArrayList<Meme>get100();
}
