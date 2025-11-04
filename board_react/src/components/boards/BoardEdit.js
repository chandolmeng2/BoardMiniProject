import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { Form, Button, Spinner, Container, Alert } from "react-bootstrap";

function BoardEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get(`/boards/${id}`)
      .then((res) =>
        setPost({ title: res.data.title, content: res.data.content })
      )
      .catch(() => setError("게시글을 불러오는 중 오류가 발생했습니다."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    axiosInstance
      .put(`/boards/${id}`, post)
      .then(() => {
        alert("게시글이 수정되었습니다.");
        navigate(`/boards/${id}`);
      })
      .catch(() => {
        setError("수정 중 오류가 발생했습니다.");
      })
      .finally(() => setSaving(false));
  };

  if (loading)
    return <Spinner animation="border" role="status" className="m-4" />;

  return (
    <Container className="mt-4" style={{ maxWidth: "600px" }}>
      <h3>게시글 수정</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formContent">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            name="content"
            value={post.content}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={saving}>
          {saving ? "저장 중..." : "저장"}
        </Button>
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => navigate(-1)}
          disabled={saving}
        >
          취소
        </Button>
      </Form>
    </Container>
  );
}

export default BoardEdit;
