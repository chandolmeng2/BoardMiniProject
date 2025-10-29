package com.example.board;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.board.service.BoardService;

@SpringBootTest
class BoardSpringApplicationTests {

	@Autowired
    private BoardService boardService;

    @Test
    public void testCreateBoards() {
        for (int i=1; i<=300; i++) {
            String title = String.format("테스트 제목 [%03d]", i);
            String content = "테스트 내용입니다.";
            boardService.createBoard(title, content);
        }
    }
}
