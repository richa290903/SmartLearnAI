import * as dashjs from "dashjs";
import { useEffect, useRef } from "react";

function DashPlayer({ url }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!url || !videoRef.current) return;

    const player = dashjs.MediaPlayer().create();
    player.initialize(videoRef.current, url, true);

    return () => player.reset();
  }, [url]);

  return (
    <video
      ref={videoRef}
      controls
      className="w-full h-[260px] md:h-[480px] object-cover"
    />
  );
}

export default DashPlayer;