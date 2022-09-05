import React, { useState } from "react";
import { Form, Button, Col, Row, Card } from "react-bootstrap";
import * as Api from "../../api";

import "./../../styles.css";

function CommentForm({commentList, setCommentList, myId, portfolioOwnerId, myName }) {
  
  const [comment, setComment] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    //아무것도 입력 안했을 때 알려주기
    if (comment == "") {
      alert("댓글을 입력해주세요");
    }
    
    //입력 댓글 post
    const res = await Api.post(`comment/add/${portfolioOwnerId}`, {
        comment
    });

    //commentList 최신화
    const addComment = res.data;
    const newCommentList = [addComment, ...commentList ];
    setCommentList(newCommentList);

    //입력창 비우기
    setComment("");
  }

  return (
    <Card.Body>
      <div className="form-inline mb-2" >
        <label style={{ fontWeight: 'bolder' }}>
           {myName}
        </label>
      </div>
      <textarea
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        value={comment}
        placeholder="댓글을 입력해주세요"
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="button" className="btn btn-dark mt-3" style={{ marginLeft: "40%"}} onClick={handleSubmit}>
        등록
      </button>
    </Card.Body>
  );
}

export default CommentForm;
