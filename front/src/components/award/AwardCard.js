import React,{useState} from "react"
import {Form, Button, Col, Row} from "react-bootstrap";
import * as Api from "../../api";


function AwardCard ({awardData, setAwardData, isEditingList, setIsEditingList, awardId}) {
    // _id(awardId) 키값으로 배열에서 해당 award 객체찾기
    const getData = awardData.find((awd) => awd._id === awardId)

    //편집창 여는 함수
    function openEdit () {
        const newIsEditingList = {...isEditingList}
        newIsEditingList[awardId] = true
        setIsEditingList(newIsEditingList)
    }

    // 삭제하는 함수
    async function deleteForm () {
        const comfirmDelete = window.confirm("정말로 삭제하시겠습니까?")
        if (comfirmDelete == true){
            const res = await Api.delete('award', awardId)


            if (res.data.message === "It's deleted!") {
                const newAwardData= awardData.filter((awd) => awd._id !== awardId)
                setAwardData(newAwardData)

                alert("삭제되었습니다")
            }
            
        }
    }

    

    return (
        <Form className="mb-4" style={{ textAlign: "left" }}>
            <Row>
                <Col xs={10}>
                    <div>{getData.award}</div>
                    <div>{getData.detail}</div>
                </Col>
                <Col>
                    <Button size="sm" variant="primary" onClick={openEdit}
                    className="btn btn-primary ms-5">편집</Button> 
                    <Button size="sm" variant="danger" onClick={deleteForm}
                    className="btn btn-danger ms-1">삭제</Button> 
                </Col>  
            </Row>
        </Form>
    )
}

export default AwardCard