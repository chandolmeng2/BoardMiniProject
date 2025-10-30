package com.example.board.comment.service;

import org.springframework.stereotype.Service;

import com.example.board.comment.domain.Comment;
import com.example.board.comment.repository.CommentRepository;
import com.example.board.post.domain.Post;
import com.example.board.post.repository.PostRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

	private final CommentRepository commentRepository;
	private final PostRepository postRepository;

	public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
		this.commentRepository = commentRepository;
		this.postRepository = postRepository;
	}

	public List<Comment> getCommentsByPostId(Long postId) {
		return commentRepository.findByPostIdOrderByCreatedAtAsc(postId);
	}

	public Comment createComment(Long postId, String content) {
		Post post = postRepository.findById(postId).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));
		Comment comment = new Comment();
		comment.setPost(post);
		comment.setContent(content);
		comment.setCreatedAt(LocalDateTime.now());
		return commentRepository.save(comment);
	}

	public void deleteComment(Long commentId) {
		commentRepository.deleteById(commentId);
	}

	public Optional<Comment> updateComment(Long id, Comment updatedComment) {
		return commentRepository.findById(id).map(comment -> {
			comment.setContent(updatedComment.getContent());
			return commentRepository.save(comment);
		});
	}

}
