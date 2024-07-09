import React from 'react';

export const useLocalCameraStream = () => {
  const [localStream, setLocalStream] = React.useState<MediaStream | null>(null);

  React.useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setLocalStream(stream);
    });
  }, []);

  return {
    localStream,
  };
};
