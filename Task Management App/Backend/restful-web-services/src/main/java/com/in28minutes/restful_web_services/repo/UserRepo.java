package com.in28minutes.restful_web_services.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.in28minutes.restful_web_services.entity.User;

@Repository
public interface UserRepo extends JpaRepository<User, Long>{
	
	Optional<User> findByName(String username);

	Optional<User> findByEmail(String email);
}
