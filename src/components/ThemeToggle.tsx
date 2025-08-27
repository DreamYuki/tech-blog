"use client"

import { useEffect, useState } from 'react'
import { SunFilled, MoonFilled } from '@ant-design/icons'

export default function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (saved) return saved
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    const html = document.documentElement
    if (theme === 'dark') html.classList.add('dark')
    else html.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <button onClick={toggle} className={className} aria-label="切换主题">
      {theme === 'dark' ? (
        <SunFilled style={{ fontSize: 20, color: '#ffffff' }} />
      ) : (
        <MoonFilled style={{ fontSize: 20, color: '#111827' }} />
      )}
    </button>
  )
}
