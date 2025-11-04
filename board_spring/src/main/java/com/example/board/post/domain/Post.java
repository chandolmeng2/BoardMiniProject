package com.example.board.post.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import com.example.board.user.domain.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String title;

	private String content;

	private LocalDateTime updatedAt;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User author;

	@PreUpdate
	public void onPreUpdate() {
		this.updatedAt = LocalDateTime.now();
	}

	@Builder.Default
	private int likeCount = 0;

	@Builder.Default
	private int dislikeCount = 0;

	@Builder.Default
	private LocalDateTime createdAt = LocalDateTime.now();
}
