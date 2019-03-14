import React, { useCallback } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 12px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AvatarContainer = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  overflow: hidden;
  margin-right: 12px;
`;
const Avatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled.div`
  font-size: 14px;
  color: #555555;
`;

const Follow = styled.div`
  background-color: rgba(255, 123, 123, 0.15);
  line-height: 24px;
  border-radius: 12px;
  padding: 0 15px;
  font-size: 12px;
  color: #ff7b7b;
`;

export function User(props) {
  const { url, userName, isFollow, onFollowChange } = props;

  const onFollowClick = useCallback(() => {
    if (onFollowChange && typeof onFollowChange === "function") {
      onFollowChange(!isFollow);
    }
  }, [isFollow, onFollowChange]);

  return (
    <Container>
      <LeftContainer>
        <AvatarContainer>
          <Avatar src={url} />
        </AvatarContainer>
        <Name>{userName}</Name>
      </LeftContainer>
      <Follow onClick={onFollowClick}>
        {isFollow ? "unfollow" : "follow"}
      </Follow>
    </Container>
  );
}
