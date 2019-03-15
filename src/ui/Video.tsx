import React, { useEffect } from "react";
import styled from "styled-components";
import XgPlayer from "xgplayer";

const Container = styled.div``;

export function Video(props) {
  const {
    url = "https://scontent-sin6-2.cdninstagram.com/vp/46f676beabc0dac875993641bc7c5136/5C8E0B3F/t50.2886-16/53668283_1694298394050351_9216518832418455552_n.mp4?_nc_ht=scontent-sin6-2.cdninstagram.com",
    width,
    height
  } = props;

  useEffect(() => {
    const player = new XgPlayer({
      id: "video",
      url,
      width: window.screen.availWidth,
      height:
        window.screen.availWidth * (width && height ? height / width : 9 / 16)
    });

    return () => {
      player.destroy();
    };
  }, []);
  return (
    <Container>
      <div id="video" />
    </Container>
  );
}
