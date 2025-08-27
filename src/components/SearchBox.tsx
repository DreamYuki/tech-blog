"use client"

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface SuggestItem { slug: string; title: string; date: string }

export default function SearchBox({ className, placeholder = "搜索..." }: { className?: string; placeholder?: string }) {
  const router = useRouter()
  const [value, setValue] = useState("")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<SuggestItem[]>([])
  const boxRef = useRef<HTMLDivElement | null>(null)

  const q = useMemo(() => value.trim(), [value])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  useEffect(() => {
    if (!q) { setItems([]); return }
    let cancelled = false
    setLoading(true)
    fetch(`/api/search?q=${encodeURIComponent(q)}&limit=5`).then(r => r.json()).then(data => {
      if (!cancelled) {
        const results = (data?.results || []).map((r: any) => ({ slug: r.slug, title: r.title, date: r.date }))
        setItems(results)
        setOpen(true)
      }
    }).catch(() => { }).finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [q])

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (q.length > 0) {
        router.push(`/search?q=${encodeURIComponent(q)}`)
        setOpen(false)
      }
    }
  }, [router, q])

  const goto = (slug: string) => {
    setOpen(false)
    router.push(`/posts/${slug}`)
  }

  const highlight = (text: string, key: string) => {
    if (!key) return text
    try {
      const re = new RegExp(`(${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, 'ig')
      return text.split(re).map((part, i) => re.test(part) ? <mark key={i} style={{ background: 'transparent', color: '#2563eb' }}>{part}</mark> : <span key={i}>{part}</span>)
    } catch { return text }
  }

  return (
    <div ref={boxRef} style={{ position: 'relative' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={className}
        aria-label="搜索文章"
        onFocus={() => { if (items.length > 0) setOpen(true) }}
      />
      {open && (q || loading) && (
        <div style={{ position: 'absolute', top: '40px', left: 0, right: 0, background: 'var(--sb-bg, #ffffff)', border: '1px solid #e5e7eb', borderRadius: 8, boxShadow: '0 10px 20px rgba(0,0,0,.08)', zIndex: 1000 }}>
          <div style={{ maxHeight: 320, overflow: 'auto' }}>
            {loading && <div style={{ padding: 12, fontSize: 14, color: '#6b7280' }}>搜索中...</div>}
            {!loading && items.length === 0 && <div style={{ padding: 12, fontSize: 14, color: '#6b7280' }}>无结果，按回车查看全部</div>}
            {!loading && items.map(item => (
              <button key={item.slug} onClick={() => goto(item.slug)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--sb-title, #111827)' }}>{highlight(item.title, q)}</div>
                <div style={{ fontSize: 12, color: 'var(--sb-date, #6b7280)' }}>{item.date}</div>
              </button>
            ))}
          </div>
        </div>
      )}
      <style jsx>{`
        :global(.dark) {
          --sb-bg: #0f172a;
          --sb-title: #e5e7eb;
          --sb-date: #94a3b8;
        }
      `}</style>
    </div>
  )
}
