import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

function ImageSlider() {
  const images = [
    "/images/img1.jpeg",
    "/images/img2.jprg",
    "/images/img3.jpeg",
  ];

  const extendedImages = [
    images[images.length - 1],
    ...images,
    images[0],
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransition, setIsTransition] = useState(true);
  const isMoving = useRef(false);
  const timerRef = useRef(null);

  function startAuto() {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      safeNext();
    }, 4000);
  }

  useEffect(() => {
    startAuto();
    return () => clearInterval(timerRef.current);
  }, []);

  function safeNext() {
    if (isMoving.current) return;
    isMoving.current = true;
    setIsTransition(true);
    setCurrentIndex((prev) => prev + 1);
  }

  function safePrev() {
    if (isMoving.current) return;
    isMoving.current = true;
    setIsTransition(true);
    setCurrentIndex((prev) => prev - 1);
  }

  function handleTransitionEnd() {
    isMoving.current = false;

    if (currentIndex === extendedImages.length - 1) {
      setIsTransition(false);
      setCurrentIndex(1);
    }

    if (currentIndex === 0) {
      setIsTransition(false);
      setCurrentIndex(extendedImages.length - 2);
    }
  }

  return (
    <div className="relative w-full h-[650px] overflow-hidden">
      <div
        onTransitionEnd={handleTransitionEnd}
        className={`flex h-full ${
          isTransition ? "transition-transform duration-700" : ""
        }`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {extendedImages.map((img, i) => (
          <img
            key={i}
            src={img}
            className="w-full h-full object-cover flex-shrink-0"
            alt="slide"
          />
        ))}
      </div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold">
          Log in to personalize your learning journey
        </h1>
        <Link to="/login" className="mt-4 bg-slate-400 py-2 px-8 rounded-lg font-semibold text-lg" >Get Started</Link>
      </div>

      {/* Left */}
      <button onClick={safePrev} className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 p-3 rounded-full">◀</button>

      {/* Right */}
      <button onClick={safeNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 p-3 rounded-full"> ▶</button>
    </div>
  );
}
export default ImageSlider;