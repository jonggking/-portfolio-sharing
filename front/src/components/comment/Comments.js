import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from "react-bootstrap";

function Comments({portfolioOwnerId}) {

    const [comments, setComments] = useState([
      {
      userName: "서니",
      comment: "방가방가",
      user_id: "ddcc847a-4fc5-4d6a-b8df-f441232f21a0"
    },
      {
        userName: "나",
        comment: "왔다감",
        user_id: 1  
      }
    ])

    const [userName, setUserName] = useState();
    const [message, setMessage] = useState();


      return (
        <Card>
          <Card.Header style={{ fontWeight: 'bolder' }}>댓글</Card.Header>
          <Card.Body>
              {comments.map((one)=>{
                return (
                  <Comment 
                  one={one}
                  key={one.user_id}
                  />
                )
              })}
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e)=>{
              setMessage(e.target.value)
           }}
        />
            <Button 
              variant="primary"
              onClick={(e)=>{
                setComments([...comments, {
                  userName: userName,
                  comment: message
                }])
                // setMessage(portfolioOwnerId)
                console.log(portfolioOwnerId)
                const data = comments.findIndex(one => one.user_id === portfolioOwnerId)
                console.log(data)
                setUserName(comments[data].userName)
                
             }}
              >입력</Button>
          </Card.Body>
        </Card>
      )
}

function Comment({one}){
  return(
    <>
    <h6 style={{ fontWeight: "bolder" }}>
      {one.userName}</h6>
    <p>{one.comment}</p>
            </>)}

export default Comments;