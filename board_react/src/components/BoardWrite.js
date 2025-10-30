import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/boards", { title, content });
      navigate("/boards"); // 작성 완료 후 글 목록 페이지로 이동
    } catch (error) {
      alert("글 작성 중 오류가 발생했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>게시글 작성</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            제목
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="제목을 입력하세요"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            내용
          </label>
          <textarea
            id="content"
            className="form-control"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="내용을 입력하세요"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          글 작성 완료
        </button>
      </form>
    </div>
  );
}

export default BoardWrite;
