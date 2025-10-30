package com.example.board.post.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.board.post.domain.Post;

public interface PostRepository extends JpaRepository<Post, Long> {
}
