import React from "react";
import styld from "styled-components";
import { RouteComponentProps } from "react-router";
import { NavigationBar } from "ui/NavigationBar";
import { Swiper } from "ui/Swiper";
import { User } from "ui/User";
import { CommentBar } from "ui/CommentBar";

const Container = styld.div`
  min-height: 100vh;
`;

const Content = styld.div`
  color: #555555;
  font-size: 16px;
  line-height: 24px;
  padding: 0 15px;
  letter-spacing: 0.3px;
`;

export function Detail(
  props: RouteComponentProps<{ lang: "en" | "jp" | "pt" }>
) {
  return (
    <Container>
      <NavigationBar />
      <Swiper />
      <User userName="Tom&Jerry" url="2.jpeg" />
      <Content>
        The foreign investment law, once adopted, will become a new and
        fundamental law for China's foreign investment, says the explanation to
        be delivered by Wang Chen, vice1 chairman of the NPC Standing2
        Committee, to deputies attending an NPC plenary session.
        <br />
        <br />
        The draft law has gone through two readings by the NPC Standing
        Committee, which made the decision in late January to submit the draft
        for a third reading.
      </Content>
      <CommentBar />
    </Container>
  );
}
