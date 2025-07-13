'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Music, X } from 'lucide-react'
import { formatDuration } from '@/lib/utils'

interface BackgroundAudioPlayerProps {
  className?: string
}

export function BackgroundAudioPlayer({ className = '' }: BackgroundAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.3)
  const [isMuted, setIsMuted] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)

  // 背景音乐列表
  const backgroundTracks = [
    {
      title: '专注学习',
      url: '/audio/focus-music.mp3',
      duration: 180
    },
    {
      title: '轻松编程',
      url: '/audio/coding-music.mp3',
      duration: 210
    },
    {
      title: '深度思考',
      url: '/audio/thinking-music.mp3',
      duration: 240
    }
  ]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    const handleEnded = () => {
      // 播放下一首
      const nextTrack = (currentTrack + 1) % backgroundTracks.length
      setCurrentTrack(nextTrack)
      setIsPlaying(true)
    }

    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [currentTrack, backgroundTracks.length])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
    if (isPlaying) {
      audio.play().catch(console.error)
    } else {
      audio.pause()
    }
  }, [isPlaying, currentTrack, volume])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }

  const nextTrack = () => {
    const next = (currentTrack + 1) % backgroundTracks.length
    setCurrentTrack(next)
  }

  const prevTrack = () => {
    const prev = (currentTrack - 1 + backgroundTracks.length) % backgroundTracks.length
    setCurrentTrack(prev)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return

    const newTime = parseFloat(e.target.value)
    audio.currentTime = newTime
    setCurrentTime(newTime)
  }

  if (!isVisible) return null

  return (
    <div className={`background-audio-player ${className}`}>
      <audio
        ref={audioRef}
        src={backgroundTracks[currentTrack]?.url}
        preload="metadata"
      />

      {/* 收起状态 */}
      {!isExpanded && (
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlayPause}
            className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors shadow-lg"
            aria-label={isPlaying ? '暂停背景音乐' : '播放背景音乐'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
          
          <button
            onClick={() => setIsExpanded(true)}
            className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-50 text-gray-700 rounded-full transition-colors shadow-lg"
            aria-label="展开音乐播放器"
          >
            <Music className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 展开状态 */}
      {isExpanded && (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">背景音乐</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="收起音乐播放器"
              >
                <Music className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="关闭音乐播放器"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="mb-3">
            <div className="text-sm font-medium text-gray-900 mb-1">
              {backgroundTracks[currentTrack]?.title}
            </div>
            <div className="text-xs text-gray-500">
              {formatDuration(currentTime)} / {formatDuration(duration)}
            </div>
          </div>

          <div className="mb-3">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={prevTrack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="上一首"
              >
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
                </svg>
              </button>
              
              <button
                onClick={togglePlayPause}
                className="flex items-center justify-center w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
                aria-label={isPlaying ? '暂停' : '播放'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </button>
              
              <button
                onClick={nextTrack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="下一首"
              >
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
                </svg>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMute}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label={isMuted ? '取消静音' : '静音'}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-gray-600" />
                ) : (
                  <Volume2 className="w-4 h-4 text-gray-600" />
                )}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 