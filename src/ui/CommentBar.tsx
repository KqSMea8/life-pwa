import React, { useState, useCallback } from "react";
import styld from "styled-components";
import { ReactComponent as Like } from "src/ui/icon/like.svg";

const Container = styld.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 -2px 6px 0 rgba(53, 60, 70, 0.06);
  padding: 10px 15px;
  box-sizing: border-box;
`;

const FormWrapper = styld.form`
  flex: 0 1 100%;
  display: block;
  height: 100%;
  margin-right: 20px;
`;
const Input = styld.input`
  display: block;
  width: 100%;
  height: 100%
  background-color: rgba(196, 196, 196, 0.16);
  border-radius: 4px;
  border: none;
  box-shadow: none;
  outline: none;
  padding: 0 12px;
  box-sizing: border-box;
  font-size: 14px;
  &::placeholder {
    color: #929292;
  }
`;

const StarWrapper = styld.div`
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Heart = styld(Like)`
  margin-right: 8px;
`;

const LikeNumber = styld.div`
  color: #555555;
  font-size: 13px;
  min-width: 10px;
`;

export function CommentBar(props) {
  const { onSubmit } = props;
  const [favour, setFavour] = useState(!!props.favour);
  const [value, setValue] = useState("");
  const [likeNum, setLikeNum] = useState(props.likeNum || 0);

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    },
    []
  );

  const onFormSubmit = useCallback(() => {
    if (onSubmit && typeof onSubmit === "function") {
      onSubmit(value);
      setValue("");
    }
  }, [value, onSubmit]);

  return (
    <Container>
      <FormWrapper onSubmit={onFormSubmit}>
        <Input
          value={value}
          placeholder="Comment......"
          onChange={onInputChange}
        />
      </FormWrapper>
      <StarWrapper
        onClick={() =>
          setFavour(s => {
            if (s) {
              setLikeNum(likeNum - 1);
            } else {
              setLikeNum(likeNum + 1);
            }
            return !s;
          })
        }
      >
        <Heart
          className={"like-icon" + (favour ? " liked" : "")}
          width={22}
          height={22}
          style={{ transition: "color 0.3s" }}
        />
        <LikeNumber>{likeNum}</LikeNumber>
      </StarWrapper>
    </Container>
  );
}
