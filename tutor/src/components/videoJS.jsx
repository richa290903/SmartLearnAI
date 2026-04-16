import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoJS = ({ options, onReady }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const videoElement = document.createElement("video-js");

    // FIXED HEIGHT FOR VIDEO + CONTROLS
    videoElement.className =
      "video-js vjs-big-play-centered  h-[260px] md:h-[200px]";

    videoRef.current.appendChild(videoElement);

    const player = videojs(videoElement, options, () => {
      onReady && onReady(player);
    });

    playerRef.current = player;


    return () => {
      if (player && !player.isDisposed()) player.dispose();
    };
  }, [options]);


  return (
    <>
      {/* CONTROL BAR FIX */}
      <style>
        {`
          .video-js {
            height: 100% !important;
          }

          .vjs-control-bar {
            display: flex !important;
            opacity: 0;
            transition: opacity .3s;
          }

          .video-js:hover .vjs-control-bar {
            opacity: 1;
          }
        `}
      </style>

      <div data-vjs-player>
        <div ref={videoRef} />
      </div>
    </>
  );
};

export default VideoJS;