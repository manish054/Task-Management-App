package com.in28minutes.restful_web_services.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.in28minutes.restful_web_services.entity.Todo;

@Repository
public interface TodoRepo extends JpaRepository<Todo, Long>{
	List<Todo> findAllByUsername(String username);
	
	@Query("SELECT t FROM Todo t WHERE t.username = :username AND t.movedToTracker = true ORDER BY t.id ASC")
	List<Todo>findByMovedToTracker(@Param("username") String username);
}
