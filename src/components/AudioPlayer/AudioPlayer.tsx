import React, { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  src: string;
  cover?: string;
}

export interface AudioPlayerProps {
  tracks: AudioTrack[];
  currentTrackIndex?: number;
  onTrackChange?: (index: number) => void;
  autoPlay?: boolean;
  showVisualizer?: boolean;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  tracks,
  currentTrackIndex = 0,
  onTrackChange,
  autoPlay = false,
  showVisualizer = true,
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState(currentTrackIndex);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      setVolume(0);
    } else {
      setVolume(1);
    }
  };

  const handleTrackEnd = () => {
    if (currentIndex < tracks.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      if (onTrackChange) {
        onTrackChange(nextIndex);
      }
    } else {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentTrack = tracks[currentIndex];

  return (
    <div className={`audio-player ${className}`}>
      <audio
        ref={audioRef}
        src={currentTrack.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
        autoPlay={autoPlay}
      />
      
      <div className="audio-player__cover">
        {currentTrack.cover ? (
          <img src={currentTrack.cover} alt={currentTrack.title} />
        ) : (
          <div className="audio-player__cover-placeholder">
            <span className="audio-player__cover-icon">🎵</span>
          </div>
        )}
      </div>

      <div className="audio-player__info">
        <h3 className="audio-player__title">{currentTrack.title}</h3>
        <p className="audio-player__artist">{currentTrack.artist}</p>
      </div>

      <div className="audio-player__controls">
        <button
          className="audio-player__button audio-player__button--prev"
          onClick={() => {
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
            setCurrentIndex(prevIndex);
            if (onTrackChange) {
              onTrackChange(prevIndex);
            }
          }}
          disabled={tracks.length <= 1}
        >
          ⏮
        </button>

        <button
          className="audio-player__button audio-player__button--play"
          onClick={handlePlayPause}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        <button
          className="audio-player__button audio-player__button--next"
          onClick={() => {
            const nextIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
            setCurrentIndex(nextIndex);
            if (onTrackChange) {
              onTrackChange(nextIndex);
            }
          }}
          disabled={tracks.length <= 1}
        >
          ⏭
        </button>
      </div>

      <div className="audio-player__progress">
        <span className="audio-player__time">{formatTime(currentTime)}</span>
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="audio-player__seek"
        />
        <span className="audio-player__time">{formatTime(duration)}</span>
      </div>

      <div className="audio-player__volume">
        <button
          className="audio-player__button audio-player__button--mute"
          onClick={handleMuteToggle}
        >
          {isMuted ? '🔇' : volume > 0.5 ? '🔊' : '🔉'}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="audio-player__volume-slider"
        />
      </div>

      {showVisualizer && (
        <div className="audio-player__visualizer">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="audio-player__visualizer-bar"
              style={{
                height: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Демо-компонент
export const AudioPlayerDemo: React.FC = () => {
  const tracks: AudioTrack[] = [
    {
      id: '1',
      title: 'Sample Track 1',
      artist: 'Artist 1',
      src: 'https://example.com/track1.mp3',
      cover: 'https://example.com/cover1.jpg',
    },
    {
      id: '2',
      title: 'Sample Track 2',
      artist: 'Artist 2',
      src: 'https://example.com/track2.mp3',
      cover: 'https://example.com/cover2.jpg',
    },
  ];

  return (
    <div className="audio-player-demo">
      <h2>Пример использования AudioPlayer</h2>
      <div className="audio-player-demo__grid">
        <div className="audio-player-demo__item">
          <h3>С визуализацией</h3>
          <AudioPlayer
            tracks={tracks}
            autoPlay={false}
            showVisualizer={true}
          />
        </div>
        <div className="audio-player-demo__item">
          <h3>Без визуализации</h3>
          <AudioPlayer
            tracks={tracks}
            autoPlay={false}
            showVisualizer={false}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer; 