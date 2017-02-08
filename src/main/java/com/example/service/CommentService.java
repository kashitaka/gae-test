package com.example.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.domain.Comment;
import com.example.repository.CommentRepository;

@Service
public class CommentService {
	@Autowired
	CommentRepository commentRepository;
	
	public Comment create ( Comment comment ) {
		return commentRepository.save(comment);
	}
	
	public Page<Comment> findAll(Pageable pageable) {
		return commentRepository.findAllorderByCreated(pageable);
	}
	
}
