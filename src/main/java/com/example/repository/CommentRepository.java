package com.example.repository;

import com.example.domain.Comment;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
	
	@Query("SELECT x FROM Comment x ORDER BY x.created DESC")
	Page<Comment> findAllorderByCreated(Pageable pageable);
	
}
