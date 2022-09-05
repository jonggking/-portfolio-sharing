import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import CommentForm from "./CommentForm";
import CommentInput from "./CommentInput";
import Form from "react-bootstrap/Form";

function Comment({ portfolioOwnerId, myId, myName}) {
  // useState 훅을 통해 comment 상태를 생성함.
  const [commentList, setCommentList] = useState([]);

  // 그 페이지 주인의 코멘트를 전부 불러옴
    useEffect(() => {
      Api.get("comment/list", portfolioOwnerId).then((res) => setCommentList(res.data.reverse()));
    }, [portfolioOwnerId]);

  return (
    <>
      <div className="mb-2 ms-3 mr-5">
        <div className="card-header bg-light" style={{fontWeight: "bolder"}}>VISITS</div>

        <CommentInput
          setCommentList={setCommentList}
          commentList={commentList}
          myId={myId}
          myName={myName}
          portfolioOwnerId={portfolioOwnerId}
        />
        
        <Card>
          {commentList.map((cmt) => (
            <CommentForm
              setCommentList={setCommentList}
              commentList={commentList}
              commentId={cmt._id}
              key={cmt._id}
              myId={myId}
              myName={myName}
              portfolioOwnerId={portfolioOwnerId}
            />
          ))}
        </Card>

     
      </div>
    </>
  );
}

export default Comment;
