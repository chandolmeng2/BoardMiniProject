import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BoardList.scss";

function BoardList() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios.get("/api/posts").then((res) => setBoards(res.data));
  }, []);

  const handleClick = (id) => {
    const board = boards.find((b) => b.id === id);
    if (board) alert(`글 제목: ${board.title}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="table-title mb-4">게시글 리스트</h1>
      <table className="table table-hover table-striped custom-table">
        <thead className="table-dark">
          <tr>
            <th style={{ width: 80 }}>번호</th>
            <th>제목</th>
            <th style={{ width: 140 }}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {boards.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center text-secondary">
                등록된 게시글이 없습니다.
              </td>
            </tr>
          ) : (
            boards.map((board) => (
              <tr key={board.id}>
                <td>{board.id}</td>
                <td>
                  <button
                    className="btn btn-link fw-bold text-primary"
                    style={{ padding: 0, textDecoration: "underline" }}
                    onClick={() => handleClick(board.id)}
                  >
                    {board.title}
                  </button>
                </td>
                <td>{board.createdAt?.slice(0, 10)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BoardList;
