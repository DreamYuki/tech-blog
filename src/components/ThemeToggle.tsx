"use client"

import { useEffect, useState } from 'react'

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
    if (theme === 'dark') {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <button onClick={toggle} className={className} aria-label="切换主题">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        {theme === 'dark' ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-11.66l-.71.71M4.05 19.95l-.71.71M21 12h1M2 12H1m16.95 7.95l-.71-.71M4.76 4.76l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 118.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        )}
      </svg>
    </button>
  )
}
