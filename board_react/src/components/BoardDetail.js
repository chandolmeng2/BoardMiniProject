import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Button, Spinner } from "react-bootstrap";

function BoardDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .finally(() => setLoading(false));
  }, [id]);

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
        <Card.Header as="h3">{post.title}</Card.Header>
        <Card.Body>
          <Card.Text>{post.content}</Card.Text>
          <div className="text-muted">
            작성일: {post.createdAt?.slice(0, 10)}
          </div>
          {/* 필요시 뒤로가기 버튼 등 추가 */}
          <Button
            variant="secondary"
            className="mt-3"
            onClick={() => window.history.back()}
          >
            목록으로 돌아가기
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default BoardDetail;
