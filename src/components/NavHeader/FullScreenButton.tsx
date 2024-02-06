import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useCallback, useState } from 'react';

interface Element {
  webkitRequestFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  mozCancelFullScreen?: () => void;
  msRequestFullscreen?: () => void;
  msExitFullscreen?: () => void;
}

const FullScreenButton: React.FC = () => {
  const [fullScreen, setFullScreen] = useState(false); // 当前是否是全屏状态
  // 进入全屏
  const requestFullScreen = useCallback(() => {
    const element: HTMLElement & Element = document.documentElement;
    // 判断各种浏览器，找到正确的方法
    const requestMethod =
      element.requestFullscreen || // W3C
      element.webkitRequestFullscreen || // Chrome等
      element.mozRequestFullScreen || // FireFox
      element.msRequestFullscreen; // IE11
    if (requestMethod) {
      requestMethod.call(element);
    }
    setFullScreen(true);
  }, []);

  // 退出全屏
  const exitFullScreen = useCallback(() => {
    // 判断各种浏览器，找到正确的方法
    const element: Document & Element = document;
    const exitMethod =
      element.exitFullscreen || // W3C
      element.mozCancelFullScreen || // firefox
      element.webkitExitFullscreen || // Chrome等
      element.msExitFullscreen; // IE11

    if (exitMethod) {
      exitMethod.call(document);
    }
    setFullScreen(false);
  }, []);

  return (
    <>
      <Tooltip placement="bottom" title={fullScreen ? '退出全屏' : '全屏'}>
        <Button
          type="text"
          icon={fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          onClick={() => {
            fullScreen ? exitFullScreen() : requestFullScreen();
          }}
          style={{
            fontSize: '16px',
            width: 50,
            height: 50,
          }}
        />
      </Tooltip>
    </>
  );
};

export default FullScreenButton;
