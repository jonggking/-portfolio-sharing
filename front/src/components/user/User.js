import React, { useState, useEffect } from "react";
import UserEditForm from "./UserEditForm";
import UserCard from "./UserCard";
import * as Api from "../../api";

function User({ portfolioOwnerId, isEditable, 프로필이미지가져온거 }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);
  // useState 훅을 통해 profilImg 상태 생성함.
  const [profileImg, setProfileImg] = useState()

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("", portfolioOwnerId).then((res) => setProfileImg(res.data));
  }, [portfolioOwnerId]);

  return (
    <>
      {isEditing ? (
        <UserEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
          portfolioOwnerId={portfolioOwnerId}
          profileImg={profileImg}
          setProfileImg={setProfileImg}
          />
      ) : (
        <UserCard
          user={user}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          profileImg={profileImg}
          setProfileImg={setProfileImg}
        />
      )}
    </>
  );
}

export default User;
