// import React, { useLayoutEffect, useRef } from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";

// const VideoJS = ({ options, onReady }) => {
//   const videoRef = useRef(null);
//   const playerRef = useRef(null);

//   useLayoutEffect(() => {
//     const videoElement = videoRef.current;
//     if (!videoElement) return;

//     // Prevent double init
//     if (!playerRef.current) {
//       const player = (playerRef.current = videojs(videoElement, options, () => {
//         console.log("Player ready");
//         onReady && onReady(player);
//       }));
//     } else {
//       // Update source if already initialized
//       playerRef.current.src(options.sources);
//     }

//     return () => {
//       if (playerRef.current) {
//         playerRef.current.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [options]);

//   return (
//     <div data-vjs-player>
//       <video
//         ref={videoRef}
//         className="video-js vjs-big-play-centered w-full h-[260px] md:h-[480px]"
//       />
//     </div>
//   );
// };

// export default VideoJS;
// import React, { useEffect, useRef } from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";

// const VideoJS = ({ options, onReady }) => {
//   const videoRef = useRef(null);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     // ✅ ensure element exists in DOM
//     if (!videoRef.current) return;

//     // ✅ create video element inside div
//     const videoElement = document.createElement("video-js");
//     videoElement.className =
//        "video-js vjs-big-play-centered w-full h-[260px] md:h-[480px]"
//     videoRef.current.appendChild(videoElement);

//     // ✅ initialize player
//     const player = videojs(videoElement, options, () => {
//       console.log("Player ready");
//       onReady && onReady(player);
//     });

//     playerRef.current = player;

//     // ✅ cleanup (VERY IMPORTANT)
//     return () => {
//       if (player && !player.isDisposed()) {
//         player.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, [options]);

//   return (
//     <div data-vjs-player>
//       <div ref={videoRef} />
//     </div>
//   );
// };

// export default VideoJS;
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