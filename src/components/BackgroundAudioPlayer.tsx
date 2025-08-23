'use client'

import React, { useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Music, X, RefreshCw } from 'lucide-react'
import { formatDuration } from '@/lib/utils'
import { useAudio } from '@/contexts/AudioContext'

interface BackgroundAudioPlayerProps {
  className?: string
}

export function BackgroundAudioPlayer({ className = '' }: BackgroundAudioPlayerProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    currentTrack,
    backgroundTracks,
    isLoading,
    togglePlayPause,
    nextTrack,
    prevTrack,
    setVolume,
    toggleMute,
    seekTo,
    loadAudioTracks
  } = useAudio()

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    seekTo(newTime)
  }

  if (!isVisible) return null

  return (
    <div className={`background-audio-player ${className}`}>
      {/* 收起状态 */}
      {!isExpanded && (
        <div className="flex items-center space-x-2">
          <button
            onClick={togglePlayPause}
            disabled={isLoading || backgroundTracks.length === 0}
            className="flex items-center justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isPlaying ? '暂停背景音乐' : '播放背景音乐'}
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : isPlaying ? (
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
            <h3 className="text-sm font-semibold text-gray-900">
              背景音乐 {backgroundTracks.length > 0 && `(${backgroundTracks.length}首)`}
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={loadAudioTracks}
                disabled={isLoading}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
                aria-label="刷新音乐列表"
              >
                <RefreshCw className={`w-4 h-4 text-gray-600 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
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

          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="text-sm text-gray-500">加载音乐列表中...</div>
            </div>
          ) : backgroundTracks.length === 0 ? (
            <div className="text-center py-4">
              <div className="text-sm text-gray-500 mb-2">未找到音频文件</div>
              <div className="text-xs text-gray-400">请将MP3文件放入 public/audio/ 目录</div>
            </div>
          ) : (
            <>
              <div className="mb-3">
                <div className="text-sm font-medium text-gray-900 mb-1">
                  {backgroundTracks[currentTrack]?.title || '未知音乐'}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDuration(currentTime)} / {formatDuration(duration)}
                </div>
              </div>
            </>
          )}

          {!isLoading && backgroundTracks.length > 0 && (
            <>
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
                    disabled={backgroundTracks.length <= 1}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                    disabled={backgroundTracks.length <= 1}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            </>
          )}
        </div>
      )}
    </div>
  )
}