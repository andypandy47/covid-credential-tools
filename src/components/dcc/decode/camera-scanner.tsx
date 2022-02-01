import * as React from 'react';
import QrScanner from 'qr-scanner';

interface ICameraScannerProps {
  onSuccessfulScan(data: string): void;
}

const CameraScanner: React.FC<ICameraScannerProps> = ({ onSuccessfulScan }) => {
  const videoRef =
    React.useRef<HTMLVideoElement>() as React.MutableRefObject<HTMLVideoElement>;

  React.useEffect(() => {
    if (!videoRef) {
      console.error('Video ref not set properly!');
      return;
    }

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        scanner.stop();
        scanner.destroy();
        onSuccessfulScan(result.data);
      },
      {
        returnDetailedScanResult: true,
        highlightScanRegion: true,
        highlightCodeOutline: true
      }
    );

    scanner.start();
  });

  return <video ref={videoRef}></video>;
};

export default CameraScanner;
