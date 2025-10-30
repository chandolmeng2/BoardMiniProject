import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Spinner } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { TextField } from "@mui/material";

function BoardDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(post?.likeCount || 0);
  const [dislikeCount, setDislikeCount] = useState(post?.dislikeCount || 0);
  const navigate = useNavigate();

  // 댓글 상태
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(true);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");

  useEffect(() => {
    axios
      .get(`/api/boards/${id}`)
      .then((res) => setPost(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    axios
      .get(`/api/boards/${id}/comments`)
      .then((res) => setComments(res.data))
      .finally(() => setCommentLoading(false));
  }, [id]);

  useEffect(() => {
    if (post) {
      setLikeCount(post.likeCount || 0);
      setDislikeCount(post.dislikeCount || 0);
    }
  }, [post]);

  const toggleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
      setLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setLiked(true);
      // 싫어요 눌려있으면 취소
      if (disliked) {
        setDisliked(false);
        setDislikeCount(dislikeCount - 1);
      }
    }
    // 서버 API 호출해 좋아요 상태 업데이트도 필요
  };
  const toggleDislike = () => {
    if (disliked) {
      setDislikeCount(dislikeCount - 1);
      setDisliked(false);
    } else {
      setDislikeCount(dislikeCount + 1);
      setDisliked(true);
      // 좋아요 눌려있으면 취소
      if (liked) {
        setLiked(false);
        setLikeCount(likeCount - 1);
      }
    }
    // 서버 API 호출해 싫어요 상태 업데이트도 필요
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    axios
      .post(`/api/boards/${id}/comments`, { content: commentText })
      .then((res) => {
        setComments((prev) => [...prev, res.data]);
        setCommentText("");
      });
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`/api/boards/${id}`)
        .then(() => {
          alert("삭제되었습니다.");
          navigate("/boards"); // 게시글 목록 경로로 이동
        })
        .catch(() => {
          alert("삭제 중 오류가 발생했습니다.");
        });
    }
  };

  const handleEdit = () => {
    navigate(`/boards/${id}/edit`);
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("댓글을 정말 삭제하시겠습니까?")) {
      axios
        .delete(`/api/boards/${id}/comments/${commentId}`)
        .then(() => {
          setComments((prev) => prev.filter((c) => c.id !== commentId));
        })
        .catch(() => alert("삭제 중 오류가 발생했습니다."));
    }
  };

  // 댓글 수정 시작
  const handleEditComment = (commentId, currentContent) => {
    setEditingCommentId(commentId);
    setEditingCommentText(currentContent);
  };

  // 댓글 수정 완료
  const handleSaveEditComment = (commentId) => {
    if (!editingCommentText.trim()) {
      alert("댓글 내용을 입력하세요.");
      return;
    }
    axios
      .put(`/api/boards/${id}/comments/${commentId}`, {
        content: editingCommentText,
      })
      .then((res) => {
        setComments((prev) =>
          prev.map((comment) =>
            comment.id === commentId
              ? { ...comment, content: editingCommentText }
              : comment
          )
        );
        setEditingCommentId(null);
        setEditingCommentText("");
      })
      .catch(() => alert("댓글 수정 중 오류가 발생했습니다."));
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Loading...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center mt-4 text-danger">
        게시글을 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Card>
        <Card.Header
          as="h3"
          className="d-flex justify-content-between align-items-center"
        >
          <div>
            {post.title}
            <span
              style={{ fontSize: "1.2rem", color: "#666", marginLeft: "12px" }}
            >
              {post.createdAt?.slice(2, 10)}
            </span>
          </div>
          <div>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleEdit}
              className="me-2"
            >
              수정
            </Button>
            <Button variant="outline-danger" size="sm" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Text>{post.content}</Card.Text>
          {post.updatedAt && (
            <div className="text-muted">
              수정일: {new Date(post.updatedAt).toLocaleString()}
            </div>
          )}
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => navigate("/boards")}
          >
            목록으로 돌아가기
          </Button>
        </Card.Body>
      </Card>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px", // 버튼 간격
          marginTop: "40px",
          marginBottom: "60px",
        }}
      >
        <Button
          variant={liked ? "primary" : "outline-primary"}
          style={{
            width: "64px", // 버튼 지름
            height: "64px",
            borderRadius: "50%",
            fontSize: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
            boxShadow: liked ? "0 0 12px #0d6efd55" : undefined,
            transition: "box-shadow 0.2s",
          }}
          onClick={toggleLike}
        >
          <FaThumbsUp style={{ fontSize: "1.7rem" }} />
          <span style={{ fontSize: "1rem", fontWeight: 600 }}>{likeCount}</span>
        </Button>
        <Button
          variant={disliked ? "danger" : "outline-danger"}
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            fontSize: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0",
            boxShadow: disliked ? "0 0 12px #dc354655" : undefined,
            transition: "box-shadow 0.2s",
          }}
          onClick={toggleDislike}
        >
          <FaThumbsDown style={{ fontSize: "1.7rem" }} />
          <span style={{ fontSize: "1rem", fontWeight: 600 }}>
            {dislikeCount}
          </span>
        </Button>
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <h5 className="mt-4 mb-3">댓글</h5>
        {commentLoading ? (
          <div className="text-center mb-2 text-secondary">
            댓글을 불러오는 중...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center mb-2 text-secondary">
            등록된 댓글이 없습니다.
          </div>
        ) : (
          comments.map((comment) => (
            <div
              className="mb-2 p-3 rounded border"
              key={comment.id}
              style={{ background: "#f8f9fa" }}
            >
              {editingCommentId === comment.id ? (
                <>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={editingCommentText}
                    placeholder={comment.content}
                    onChange={(e) => setEditingCommentText(e.target.value)}
                    variant="outlined"
                  />
                  <Button
                    size="sm"
                    className="mt-2"
                    onClick={() => handleSaveEditComment(comment.id)}
                  >
                    수정 완료
                  </Button>
                </>
              ) : (
                <>
                  <div style={{ fontSize: "1rem" }}>{comment.content}</div>
                  <div className="text-muted" style={{ fontSize: ".85rem" }}>
                    {comment.createdAt?.slice(0, 16)}
                  </div>
                  <div className="mt-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEditComment(comment.id)}
                    >
                      수정
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      삭제
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
        {/* 댓글 입력창 */}
        <form className="mt-3 d-flex" onSubmit={handleCommentSubmit}>
          <TextField
            label="댓글"
            multiline
            rows={4}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Button
            type="submit"
            variant="primary"
            disabled={!commentText.trim()}
            style={{
              writingMode: "horizontal-tb",
              transform: "none",
              display: "inline-block",
              whiteSpace: "nowrap",
              flexDirection: "row",
              marginLeft: "8px",
            }}
          >
            등록
          </Button>
        </form>
      </div>
    </div>
  );
}

export default BoardDetail;
