package com.example.board.comment.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.board.comment.domain.Comment;
import com.example.board.comment.service.CommentService;

import java.util.List;

@RestController
@RequestMapping("/api/boards/{postId}/comments")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

	private final CommentService commentService;

	public CommentController(CommentService commentService) {
		this.commentService = commentService;
	}

	@GetMapping
	public List<Comment> getComments(@PathVariable("postId") Long postId) {
		return commentService.getCommentsByPostId(postId);
	}

	@PostMapping
	public Comment createComment(@PathVariable("postId") Long postId, @RequestBody Comment comment) {
		return commentService.createComment(postId, comment.getContent());
	}

	@DeleteMapping("/{commentId}")
	public ResponseEntity<Void> deleteComment(@PathVariable("commentId") Long commentId) {
		commentService.deleteComment(commentId);
		return ResponseEntity.noContent().build(); // 204 No Content 반환
	}

	@PutMapping("/{id}")
	public ResponseEntity<Comment> updateComment(@PathVariable("id") Long id, @RequestBody Comment updatedComment) {
		return commentService.updateComment(id, updatedComment).map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

}
