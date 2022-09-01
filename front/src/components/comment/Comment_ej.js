import React, { useState, useEffect } from "react";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";
import CommentForm from "./CommentForm";
import CommentInput from "./CommentInput";
import Form from "react-bootstrap/Form";

function Comment({ portfolioOwnerId, myId, myName}) {
  // useState 훅을 통해 user 상태를 생성함.
  const [comment, setComment] = useState(null);
  const [userName, setUserName] = useState(null);
  const [commentList, setCommentList] = useState([]);

  //그 페이지 유저의 코멘트를 전부 불러옴
    useEffect(() => {
      // "users/     " 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
      Api.get("users", portfolioOwnerId).then((res) => setUserName(res.data.name));
    }, [portfolioOwnerId]);

  //setCommentList()

  // const CommentList = [
  //   {
  //     user_id: "fc597063-9b58-42a6-851a-6134d8d577df",
  //     comment:
  //       "코멘트를 불러왔음. 코멘트를 불러왔음.코멘트를 불러왔음.코멘트를 불러왔음.코멘트를 불러왔음.코멘트를 불러왔음.코멘트를 불러왔음.코멘트를 불러왔음.코멘트를 불러왔음.코멘트를 불러왔음.코멘트를 불러왔음.코멘트를 불러왔음.",
  //     userName: "은정",
  //     _id: "630ef69429d595081ce8e679",
  //     createdAt: "2022-08-31T05:50:12.247Z",
  //     updatedAt: "2022-08-31T05:50:12.247Z",
  //     __v: 0,
  //   },
  //   {
  //     user_id: "6d54f14a-393b-4510-9d26-29b48e6d4216",
  //     comment: "안녕하세요.",
  //     userName: "수진",
  //     _id: "30081ce8e679",
  //     createdAt: "2022-08-31T05:50:12.247Z",
  //     updatedAt: "2022-08-31T05:50:12.247Z",
  //     __v: 0,
  //   },
  // ];

  return (
    <>
      <div class="card mb-2">
        <div class="card-header bg-light">COMMENT</div>
        <CommentInput
          setCommentList={setCommentList}
          commentList={CommentList}
          myId={myId}
          myName={myName}
          portfolioOwnerId={portfolioOwnerId}
        />
        <card>
          {CommentList.map((cmt) => (
            <CommentForm
              setCommentList={setCommentList}
              commentList={CommentList}
              commentId={cmt._id}
              key={cmt._id}
              myId={myId}
              myName={myName}
            />
          ))}
        </card>
      </div>
    </>
  );
}

export default Comment;
