import axios from "axios";
import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function UserEditForm({ user, setIsEditing, setUser, profileImg, setProfileImg }) {
  
  
  const [logoLoding, setLogoLoding] = useState();

  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  // 필수값 입력 확인
  const isNameValid = name.length > 0;
  const isEmailValid = email.length > 0;
  const isDescriptionValid = description.length > 0;

  //필수값 조건 동시에 만족되는지 확인
  const isFormValid = isNameValid && isEmailValid && isDescriptionValid;
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
    });

    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
    console.log(profileImg)

    
    // 유저 사진정보 PUT 요청
    // const res = await Api.put(''), {
    //   profileImg
    // }
    
    const formData = new FormData()
    formData.append('uploadImage', profileImg[0])

    const config = {
      Headers: {
        'content-type': 'multipart/form-data',
      },
    };

    axios.post('', formData, config);
  }


    // onImgChange = async (event: any) =>{
    //   setLogoLoding(true)
    //   const formData = new FormData()
    //   formData.append('file', event.target.files[0])
    //   const response = await apiClient.post('', formData);
    //   setLogoLoding(false)
    // }



  return (
    <Card className="mb-2">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>프로필 사진 선택</Form.Label>
            <Form.Control 
                type="file"
                key="profileFile"
                accept='image/*'
                onChange={(e)=>setProfileImg(e.target.files)} />
          </Form.Group>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!isNameValid && (
                <Form.Text className="text-success">
                  수정사항을 입력해주세요.
            </Form.Text>)}
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEmailValid && (
                <Form.Text className="text-success">
                  수정사항을 입력해주세요.
            </Form.Text>)}
          </Form.Group>

          <Form.Group controlId="userEditDescription">
            <Form.Control
              type="text"
              placeholder="정보, 인사말"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {!isDescriptionValid && (
                <Form.Text className="text-success">
                  수정사항을 입력해주세요.
            </Form.Text>)}
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3"
              disabled={!isFormValid} >
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
