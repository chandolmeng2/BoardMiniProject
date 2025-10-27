package com.example.board.service;

import com.example.board.domain.Board;

import java.util.List;

public interface BoardService {
    List<Board> findAllBoards();
    Board saveBoard(Board board);
}
