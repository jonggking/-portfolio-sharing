import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from "react-bootstrap";

function Comments() {

    const [comments, setComments] = useState([
      {
      comment: "방가방가"}])
    
      const [comment, setComment] = useState()

      return (
        <Card>
          <Card.Header style={{ fontWeight: 'bolder' }}>댓글</Card.Header>
          <Card.Body>
            <Card.Text>
            누구 :{' '} 
              {comments[0].comment}
            </Card.Text>
            <Form.Control
              aria-label="Small"
              aria-describedby="inputGroup-sizing-sm"
              onChange={(e)=>{
            setComment(e.target.value)
            let copy = [...comment]


          }}
        />

            <Button variant="primary">입력</Button>
          </Card.Body>
        </Card>
      )
}
export default Comments;