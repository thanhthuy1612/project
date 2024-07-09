import React from 'react';
import { useLocalCameraStream } from '../../../../../utils/useLocalCameraStream';
import VideoFeed from './VideoFeed';

const VideoCall: React.FC = () => {
  const { localStream } = useLocalCameraStream();

  if (!localStream) {
    return null;
  }

  return <VideoFeed mediaStream={localStream} isMuted={true} />;
}

export default VideoCall