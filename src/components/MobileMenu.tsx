"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function MobileMenu({ buttonClass, iconClass }: { buttonClass?: string; iconClass?: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [open])

  return (
    <>
      <button className={buttonClass} aria-label="打开菜单" onClick={() => setOpen(true)}>
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
          <div onClick={() => setOpen(false)} style={{ flex: 1, background: 'rgba(0,0,0,.45)' }} />
          <nav style={{ width: 260, background: 'var(--mm-bg,#fff)', borderLeft: '1px solid var(--mm-border,#e5e7eb)', padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontWeight: 600, color: 'var(--mm-title,#111827)' }}>导航</div>
              <button onClick={() => setOpen(false)} aria-label="关闭" style={{ color: 'var(--mm-title,#111827)' }}>✕</button>
            </div>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li><Link href="/" onClick={() => setOpen(false)} style={{ color: 'var(--mm-link,#374151)', textDecoration: 'none' }}>首页</Link></li>
              <li><Link href="/cultivation" onClick={() => setOpen(false)} style={{ color: 'var(--mm-link,#374151)', textDecoration: 'none' }}>修炼经历</Link></li>
              <li><Link href="/posts" onClick={() => setOpen(false)} style={{ color: 'var(--mm-link,#374151)', textDecoration: 'none' }}>文章</Link></li>
              <li><Link href="/about" onClick={() => setOpen(false)} style={{ color: 'var(--mm-link,#374151)', textDecoration: 'none' }}>关于</Link></li>
              <li><Link href="/category/qi-refining" onClick={() => setOpen(false)} style={{ color: 'var(--mm-link,#374151)', textDecoration: 'none' }}>炼气期</Link></li>
              <li><Link href="/category/foundation" onClick={() => setOpen(false)} style={{ color: 'var(--mm-link,#374151)', textDecoration: 'none' }}>筑基期</Link></li>
              <li><Link href="/category/core-formation" onClick={() => setOpen(false)} style={{ color: 'var(--mm-link,#374151)', textDecoration: 'none' }}>结丹期</Link></li>
              <li><Link href="/category/nascent-soul" onClick={() => setOpen(false)} style={{ color: 'var(--mm-link,#374151)', textDecoration: 'none' }}>元婴期</Link></li>
            </ul>
            <style jsx>{`
              :global(.dark) {
                --mm-bg:#0f172a; --mm-border:#1f2937; --mm-title:#e5e7eb; --mm-link:#cbd5e1;
              }
            `}</style>
          </nav>
        </div>
      )}
    </>
  )
}
