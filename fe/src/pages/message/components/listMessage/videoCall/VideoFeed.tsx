
import React from 'react';

export interface IVideoFeedProps {
  mediaStream: MediaStream;
  isMuted?: boolean;
}

const VideoFeed: React.FC<IVideoFeedProps> = ({
  mediaStream,
  isMuted = false,
}) => {
  return (
    <video
      ref={(ref) => {
        if (ref) {
          ref.srcObject = mediaStream;
        }
      }}
      autoPlay={true}
      muted={isMuted}
    />
  );
};

export default VideoFeed;