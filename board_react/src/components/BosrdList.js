import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa"; // 아이콘 라이브러리 (선택 사항)

function BoardList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showScroll, setShowScroll] = useState(false);

  const postsPerPage = 20;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    axios.get("/api/boards").then((res) => setPosts(res.data));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setShowScroll(window.scrollY > 150);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="BoardList" className="container mt-8">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="table-title m-0">게시글 리스트</h1>
        <Link to="/boards/new" className="btn btn-primary">
          글 작성
        </Link>
      </div>
      <Table table table-hover table-striped custom-table>
        <thead className="table-dark">
          <tr>
            <th style={{ width: 80 }}>번호</th>
            <th>제목</th>
            <th style={{ width: 140 }}>작성일</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center text-secondary">
                등록된 게시글이 없습니다.
              </td>
            </tr>
          ) : (
            currentPosts.map((post, idx) => (
              <tr key={post.id}>
                <td>{(currentPage - 1) * postsPerPage + idx + 1}</td>
                <td>
                  <Link
                    to={`/boards/${post.id}`}
                    className="btn btn-link fw-bold text-primary"
                    style={{ padding: 0, textDecoration: "underline" }}
                  >
                    {post.title}
                  </Link>
                </td>
                <td>{post.createdAt?.slice(0, 10)}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      <div
        className="pagination"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <button
          className="btn btn-sm btn-light mx-1"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          className="btn btn-sm btn-light mx-1"
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((num) => (
          <button
            key={num}
            className={`btn btn-sm mx-1 ${
              num === currentPage ? "btn-primary" : "btn-light"
            }`}
            onClick={() => handlePageChange(num)}
          >
            {num}
          </button>
        ))}
        <button
          className="btn btn-sm btn-light mx-1"
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        <button
          className="btn btn-sm btn-light mx-1"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>
      {showScroll && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed",
            right: "10px",
            bottom: "10px",
            zIndex: 9999,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.14)",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
          aria-label="맨 위로"
        >
          <FaArrowUp
            style={{
              fontSize: "24px",
              position: "relative",
              marginBottom: "5px",
            }}
          />
        </button>
      )}
    </div>
  );
}

export default BoardList;
