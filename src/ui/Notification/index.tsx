import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { useImmerState } from 'src/hooks/immer';
import { noop } from 'src/utils/empty';

const NotificationWrapper = styled.div<{ visible?: boolean }>`
  position: fixed;
  z-index: 1010;
  color: #ff3d3d;
  top: -70px;
  left: 20px;
  right: 20px;
  height: 60px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 2px 10px 0 rgba(0,0,0,0.2);
  box-sizing: border-box;
  transition: all ease-in 0.3s;
  transform: ${props => (props.visible ? 'translateY(80px)' : 'translateY(0)')};
  opacity: ${props => (props.visible ? 0.85 : 0)};
  background: #fff;
  &:hover {
    cursor: pointer;
  }
`;

export const Notification = () => {
  const domRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useImmerState({ visible: false, content: '' });
  const clickNotificationHandlerRef = useRef<() => any>(noop);
  const timerRef = useRef(0);
  useEffect(() => {
    domRef.current = document.querySelector('#_app_notification_');
    if (!domRef.current) {
      domRef.current = document.createElement('div');
      domRef.current.id = '_app_notification_';
      document.body.appendChild(domRef.current);
    }

    const handleAppFoundUpdate = () => {
      clickNotificationHandlerRef.current = () => {
        setState(s => {
          s.visible = false;
        });
        location.reload();
      };

      setState(s => {
        s.visible = true;
        s.content =
          '😋 Vinna is ready to update. Could you please to reload vinna?';
      });
    };

    const handleAppUpdated = () => {
      clickNotificationHandlerRef.current = () => {
        setState(s => {
          s.visible = false;
        });
      };

      setState(s => {
        s.visible = true;
        s.content = '😀 Vinna has been updated.';
      });
    };

    document.addEventListener('appUpdated', handleAppUpdated, { passive: true });
    document.addEventListener('appFoundUpdate', handleAppFoundUpdate, { passive: true });
    return () => {
      clearTimeout(timerRef.current);
      document.removeEventListener('appUpdated', handleAppUpdated);
      document.removeEventListener('appFoundUpdate', handleAppFoundUpdate);
    };
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (state.visible) {
      timerRef.current = setTimeout(() => {
        setState(s => {
          s.visible = false;
        });
      }, 3000);
    }
  }, [state.visible]);

  const cb = useCallback(e => {
    e.stopPropagation();
    clickNotificationHandlerRef.current();
  }, []);

  return (
    domRef.current &&
    ReactDOM.createPortal(
      <NotificationWrapper
        onTouchStart={cb}
        onClick={cb}
        visible={state.visible}
      >
        {state.content}
      </NotificationWrapper>,
      domRef.current
    )
  );
};
