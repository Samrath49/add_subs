"use client";

import { useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import CaptionInput from "./components/CaptionInput";

export default function Home() {
  const [videoUrl, setVideoUrl] = useState("");
  const [captions, setCaptions] = useState<
    Array<{ text: string; start: number; end: number }>
  >([]);

  const handleVideoUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const isValidUrl = (urlString: string) => {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!urlPattern.test(urlString);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);

    if (!isValidUrl(e.target.value)) {
      alert("Invalid URL");
      setVideoUrl("");
    }
  };

  const handleCaptionSubmit = (newCaption: {
    text: string;
    start: number;
    end: number;
  }) => {
    setCaptions([...captions, newCaption]);
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Video Captioner</h1>
      <form onSubmit={handleVideoUrlSubmit} className="mb-4">
        <input
          type="url"
          value={videoUrl}
          onChange={handleUrlChange}
          placeholder="Enter video URL"
          className="w-full p-2 border rounded text-black"
          required
        />
      </form>
      {videoUrl && <VideoPlayer url={videoUrl} captions={captions} />}
      <CaptionInput onSubmit={handleCaptionSubmit} />
    </main>
  );
}
