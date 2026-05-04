"use client";

import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  X,
  MoreHorizontal,
} from "lucide-react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import { useRef, useState } from "react";
import 'react-h5-audio-player/lib/styles.css';

interface GlobalAudioPlayerProps {
  url: string;
  title: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function GlobalAudioPlayer({
  url,
  title,
  onClose,
  onPrevious,
  onNext,
}: GlobalAudioPlayerProps) {
  const playerRef = useRef<AudioPlayer>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-bg-secondary border-t border-gray-200 shadow-lg animate-in slide-in-from-bottom duration-300">
      <style>{`
        .rhap_progress-section {
          flex: 1 1 auto;
          display: flex;
          align-items: center;
          min-width: 100%;
        }
        .rhap_progress-container {
          position: absolute;
          top: -2px;
          left: 0;
          right: 0;
          margin: 0 !important;
          height: 4px;
          cursor: pointer;
          z-index: 20;
        }
        .rhap_progress-bar { 
          height: 4px !important; 
          background-color: #e5e7eb !important; 
          border-radius: 0 !important;
        }
        .rhap_progress-filled { 
          background-color: #3d7a3a !important; 
          border-radius: 0 !important;
        }
        .rhap_progress-indicator { 
          display: none !important; 
        }
        .rhap_container { 
          background-color: transparent !important; 
          box-shadow: none !important; 
          padding: 0 !important; 
          height: 0px; 
          overflow: visible !important;
        }
      `}</style>

      <AudioPlayer
        ref={playerRef}
        src={url}
        autoPlay
        showJumpControls={false}
        customProgressBarSection={[RHAP_UI.PROGRESS_BAR]}
        customControlsSection={[]}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={onNext}
        onListen={(e) => {
          const audio = e.target as HTMLAudioElement;
          setCurrentTime(formatTime(audio.currentTime));
        }}
        onLoadedMetaData={(e) => {
          const audio = e.target as HTMLAudioElement;
          setDuration(formatTime(audio.duration));
        }}
      />

      <div className="max-w-screen-xl mx-auto px-4 md:px-6 py-4 flex justify-center md:grid md:grid-cols-3 items-center">
        <div className="hidden md:flex justify-start overflow-hidden">
          <span className="text-[15px] font-semibold text-text-secondary truncate whitespace-nowrap">
            {title}
          </span>
        </div>

        <div className="flex items-center justify-center gap-3 sm:gap-5">
          <span className="text-[13px] tabular-nums text-gray-400 font-medium">
            {currentTime}
          </span>

          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal size={20} />
          </button>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onPrevious}
              disabled={!onPrevious}
              className="text-gray-400 hover:text-primary transition-colors disabled:opacity-20"
            >
              <SkipBack size={22} fill="currentColor" />
            </button>

            <button
              onClick={() => {
                const audio = playerRef.current?.audio.current;
                if (audio) audio.paused ? audio.play() : audio.pause();
              }}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white hover:bg-primary shadow-sm transition-all active:scale-90"
            >
              {isPlaying ? (
                <Pause size={20} fill="white" />
              ) : (
                <Play size={20} fill="white" className="ml-0.5" />
              )}
            </button>

            <button
              onClick={onNext}
              disabled={!onNext}
              className="text-gray-400 hover:text-primary transition-colors disabled:opacity-20"
            >
              <SkipForward size={22} fill="currentColor" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <X size={20} />
          </button>

          <span className="text-[13px] tabular-nums text-gray-400 font-medium">
            {duration}
          </span>
        </div>

        <div className="hidden md:flex justify-end pointer-events-none"></div>
      </div>
    </div>
  );
}