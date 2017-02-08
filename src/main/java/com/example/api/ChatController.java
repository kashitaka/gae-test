package com.example.api;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.domain.Comment;
import com.example.service.CommentService;
import com.example.web.CommentPost;

@RestController
@RequestMapping("api/chat")
public class ChatController {
	@Autowired
	CommentService commentService;
	
	@PostMapping("/create")
	public Comment createComment( @RequestBody CommentPost commentPost) {
		Comment comment = new Comment();
		comment.setComment(commentPost.getMessage());
		comment.setCreated(LocalDateTime.now());

		return commentService.create(comment);
	}
	
	@GetMapping("")
	Page<Comment> getComments(@PageableDefault Pageable pageable) {
		return commentService.findAll(pageable);
	}
}
