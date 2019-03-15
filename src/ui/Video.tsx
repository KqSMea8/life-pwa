import React, { useEffect } from "react";
import styled from "styled-components";
import XgPlayer from "xgplayer";

const Container = styled.div``;

export function Video(props) {
  useEffect(() => {
    const player = new XgPlayer({
      id: "video",
      url:
        "http://s2.pstatp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4",
      width: window.screen.availWidth,
      height: window.screen.availWidth * 0.5625
    });

    return () => {
      console.log('des');
      player.destroy();
    }
  }, []);
  return (
    <Container>
      <div id="video" />
    </Container>
  );
}
