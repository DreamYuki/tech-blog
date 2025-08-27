'use client'

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react'

interface AudioTrack {
  id: string
  title: string
  url: string
  size: number
  modified: string
}

interface AudioContextType {
  // 播放状态
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  currentTrack: number
  backgroundTracks: AudioTrack[]
  isLoading: boolean

  // 控制方法
  togglePlayPause: () => void
  nextTrack: () => void
  prevTrack: () => void
  setVolume: (volume: number) => void
  toggleMute: () => void
  seekTo: (time: number) => void
  loadAudioTracks: () => Promise<void>

  // 音频元素引用（可变引用，允许赋值）
  audioRef: React.MutableRefObject<HTMLAudioElement | null>
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

interface AudioProviderProps {
  children: ReactNode
}

export function AudioProvider({ children }: AudioProviderProps) {
  // 从localStorage恢复音频状态，确保页面跳转时状态保持
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('audio-isPlaying')
      return saved ? JSON.parse(saved) : false
    }
    return false
  })

  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolumeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('audio-volume')
      return saved ? parseFloat(saved) : 0.3
    }
    return 0.3
  })

  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('audio-isMuted')
      return saved ? JSON.parse(saved) : false
    }
    return false
  })

  const [currentTrack, setCurrentTrack] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('audio-currentTrack')
      return saved ? parseInt(saved) : 0
    }
    return 0
  })

  const [backgroundTracks, setBackgroundTracks] = useState<AudioTrack[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [autoplayUnlocked, setAutoplayUnlocked] = useState(false)

  // 全局单例 Audio：防止任何路由/404导致的卸载重建
  useEffect(() => {
    if (typeof window === 'undefined') return
    const w = window as any
    if (!w.__globalAudio) {
      const el = new Audio()
      el.preload = 'metadata'
      el.muted = false // 以静音方式初始化，规避浏览器自动播放限制
      el.style.display = 'none'
      try {
        document.body.appendChild(el)
      } catch { }
      w.__globalAudio = el
    }
    audioRef.current = w.__globalAudio as HTMLAudioElement
  }, [])

  // 加载音频文件列表
  const loadAudioTracks = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/audio')
      const data = await response.json()
      setBackgroundTracks(data.tracks || [])

      // 如果没有音频文件，使用默认列表
      if (data.tracks.length === 0) {
        setBackgroundTracks([
          {
            id: 'default-1',
            title: '游戏科学《黑神话：悟空》主题音乐',
            url: '/游戏科学《黑神话：悟空》主题音乐.mp3',
            size: 0,
            modified: new Date().toISOString()
          }
        ])
      }
    } catch (error) {
      console.error('Failed to load audio tracks:', error)
      // 使用默认列表作为后备
      setBackgroundTracks([
        {
          id: 'fallback-1',
          title: '游戏科学《黑神话：悟空》主题音乐',
          url: '/游戏科学《黑神话：悟空》主题音乐.mp3',
          size: 0,
          modified: new Date().toISOString()
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // 组件挂载时加载音频列表
  useEffect(() => {
    loadAudioTracks()
  }, [])

  // 状态持久化：将音频状态保存到localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('audio-isPlaying', JSON.stringify(isPlaying))
    }
  }, [isPlaying])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('audio-volume', volume.toString())
    }
  }, [volume])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('audio-isMuted', JSON.stringify(isMuted))
    }
  }, [isMuted])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('audio-currentTrack', currentTrack.toString())
    }
  }, [currentTrack])

  // 音频列表加载完成后自动开始播放（仅首次）
  const [hasAutoStarted, setHasAutoStarted] = useState(false)
  useEffect(() => {
    if (backgroundTracks.length > 0 && !isLoading && !hasAutoStarted) {
      const timer = setTimeout(() => {
        setIsPlaying(true)
        setHasAutoStarted(true)
      }, 1000) // 给更多时间让音频加载
      return () => clearTimeout(timer)
    }
  }, [backgroundTracks.length, isLoading, hasAutoStarted])

  // 音频事件监听
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // 单曲时使用 loop 自动循环
    audio.loop = backgroundTracks.length === 1

    const setAudioData = () => {
      setDuration(audio.duration)
      setCurrentTime(audio.currentTime)
    }

    const setAudioTime = () => setCurrentTime(audio.currentTime)

    const handleEnded = () => {
      if (backgroundTracks.length > 1) {
        // 多曲：顺序播放下一首
        const next = (currentTrack + 1) % backgroundTracks.length
        setCurrentTrack(next)
        setTimeout(() => {
          setIsPlaying(true)
        }, 100)
      } else {
        // 单曲：兜底重播（避免某些环境 loop 被忽略）
        audio.currentTime = 0
        if (isPlaying) {
          audio.play().catch(() => { })
        }
      }
    }

    const handleError = (e: Event) => {
      console.error('Audio error:', e)
      if (backgroundTracks.length > 1) {
        const next = (currentTrack + 1) % backgroundTracks.length
        setCurrentTrack(next)
      }
    }

    audio.addEventListener('loadeddata', setAudioData)
    audio.addEventListener('timeupdate', setAudioTime)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('loadeddata', setAudioData)
      audio.removeEventListener('timeupdate', setAudioTime)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [currentTrack, backgroundTracks.length, isPlaying])

  // 音频播放控制
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // 直接根据用户状态同步静音与音量
    audio.muted = isMuted
    if (!isMuted) {
      audio.volume = volume
    }

    if (isPlaying) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (!autoplayUnlocked) {
              setAutoplayUnlocked(true)
            }
          })
          .catch(error => {
            // 若被浏览器策略阻止，添加一次性指针事件解锁（不做静音回退）
            const notAllowed = (error && (error.name === 'NotAllowedError' || error.message?.includes('play() failed')))
            if (notAllowed) {
              const resume = () => {
                audio.play().then(() => {
                  setAutoplayUnlocked(true)
                  document.removeEventListener('pointerdown', resume)
                }).catch(() => {
                  document.removeEventListener('pointerdown', resume)
                })
              }
              document.addEventListener('pointerdown', resume, { once: true })
            }
          })
      }
    } else {
      audio.pause()
    }
  }, [isPlaying, volume, isMuted, autoplayUnlocked])

  // 控制方法
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    const next = (currentTrack + 1) % backgroundTracks.length
    setCurrentTrack(next)
  }

  const prevTrack = () => {
    const prev = (currentTrack - 1 + backgroundTracks.length) % backgroundTracks.length
    setCurrentTrack(prev)
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
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

  const seekTo = (time: number) => {
    const audio = audioRef.current
    if (!audio) return

    audio.currentTime = time
    setCurrentTime(time)
  }

  const contextValue: AudioContextType = {
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
    loadAudioTracks,
    audioRef
  }

  // 音频源更新
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !backgroundTracks[currentTrack]) return

    const newSrc = backgroundTracks[currentTrack].url
    const resolved = typeof window !== 'undefined' ? new URL(newSrc, window.location.origin).href : newSrc
    if (audio.src !== resolved) {
      const wasPlaying = isPlaying
      audio.src = resolved
      audio.load()
      if (wasPlaying) {
        audio.play().then(() => {
          setAutoplayUnlocked(true)
        }).catch(() => {
          // 等待用户手势解锁（不做静音自动播放回退）
          const resume = () => {
            audio.play().then(() => {
              setAutoplayUnlocked(true)
              document.removeEventListener('pointerdown', resume)
            }).catch(() => {
              document.removeEventListener('pointerdown', resume)
            })
          }
          document.addEventListener('pointerdown', resume, { once: true })
        })
      }
    }
  }, [currentTrack, backgroundTracks])

  return (
    <AudioContext.Provider value={contextValue}>
      {/* 全局音频元素移至 window.__globalAudio，不在React树内渲染 */}
      {children}
    </AudioContext.Provider>
  )
}
