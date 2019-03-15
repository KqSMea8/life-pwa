import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 75% 0 0 0;
`;

const SwiperContent = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const ImageWrap = styled.div`
  height: 100%;
  width: 100%;
  display: inline-flex;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  flex: 0 0 auto;
  object-fit: cover;
`;

export function Swiper(props) {
  const {
    images = [
      { src: "/1.jpeg" },
      { src: "/2.jpeg" },
      { src: "/3.jpeg" },
      { src: "/4.jpeg" },
      { src: "/5.jpeg" },
      { src: "/6.jpeg" }
    ]
  } = props;
  const containerRef = useRef(null);

  const [offset, setOffset] = useState(0);
  const [touchStartOffset, setTouchStartOffset] = useState(0);
  // const [idx, setIdx] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [touchX, setTouchX] = useState(0);

  const onTouchStart = useCallback(
    (event: React.TouchEvent) => {
      if (!isMoving) {
        setIsMoving(true);
        setTouchX(event.changedTouches[0].clientX);
        setTouchStartOffset(offset);
      }
    },
    [offset, isMoving]
  );

  const onTouchMove = useCallback(
    (event: React.TouchEvent) => {
      if (isMoving) {
        const touch = event.changedTouches[0];
        const screenWidth = window.screen.availWidth;
        let offsetX = touch.clientX - touchX + touchStartOffset;

        if (offsetX >= 0) {
          offsetX = 0;
        }

        if (offsetX <= -screenWidth * (images.length - 1)) {
          offsetX = -screenWidth * (images.length - 1);
        }

        setOffset(offsetX);
      }
    },
    [touchStartOffset, offset, isMoving]
  );

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (isMoving) {
        const absOffset = Math.abs(offset - touchStartOffset);
        const flag = (offset - touchStartOffset) / absOffset;
        const screenWidth = window.screen.availWidth;
        const distance = screenWidth * 0.3;

        if (absOffset < distance) {
          setOffset(touchStartOffset);
        } else {
          setOffset(touchStartOffset + screenWidth * flag);
        }

        setIsMoving(false);
      }
    },
    [touchStartOffset, offset, isMoving]
  );

  return (
    <Container>
      <SwiperContent>
        <ImageWrap
          ref={containerRef}
          style={{
            transform: `translateX(${offset}px)`,
            transition: !isMoving ? "transform 100ms ease" : ""
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {images.map((image, index) => (
            <Image key={index} src={image.src} />
          ))}
        </ImageWrap>
      </SwiperContent>
    </Container>
  );
}
