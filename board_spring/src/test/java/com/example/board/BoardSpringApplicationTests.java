package com.example.board;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.board.post.domain.Post;
import com.example.board.post.service.PostService;

@SpringBootTest
class BoardSpringApplicationTests {

	@Autowired
	private PostService postService;

	@Test
	void bulkCreatePosts() {
        int totalPosts = 300;
        for (int i = 1; i <= totalPosts; i++) {
            String title = String.format("테스트 제목 [%03d]", i);
            String content = String.format("테스트 내용입니다. [%03d]", i);
            Post post = new Post();
            post.setTitle(title);
            post.setContent(content);
            try {
                postService.createPost(post);
            } catch (Exception e) {
                System.err.println("Fail to create post #" + i + ": " + e.getMessage());
            }
        }
        System.out.println(totalPosts + "개의 게시글 생성 완료");
    }
}
