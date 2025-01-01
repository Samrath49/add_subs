"use client";

import { useRef, useEffect, useState } from "react";

interface Caption {
  text: string;
  start: number;
  end: number;
}

interface VideoPlayerProps {
  url: string;
  captions: Caption[];
}

export default function VideoPlayer({ url, captions }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentCaption, setCurrentCaption] = useState("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const caption = captions.find(
        (cap) => currentTime >= cap.start && currentTime <= cap.end
      );
      setCurrentCaption(caption ? caption.text : "");
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [captions]);

  return (
    <div className="relative">
      <video ref={videoRef} src={url} controls className="w-full">
        Your browser does not support the video tag.
      </video>
      {currentCaption && (
        <div className="absolute bottom-8 left-0 right-0 text-center bg-black bg-opacity-50 text-white p-2">
          {currentCaption}
        </div>
      )}
    </div>
  );
}
