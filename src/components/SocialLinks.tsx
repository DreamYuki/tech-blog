"use client"

import { useEffect, useState } from 'react'
import { WechatFilled, GithubFilled } from '@ant-design/icons'

interface Props {
  containerClass?: string
  linkClass?: string
  iconClass?: string
  feishuUrl: string
  githubUser: string
  wechatQrSrc: string
}

export default function SocialLinks({ containerClass, linkClass, iconClass, feishuUrl, githubUser, wechatQrSrc }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className={containerClass}>
      {/* 微信 */}
      <a href="#" className={linkClass} aria-label="微信" onClick={(e) => { e.preventDefault(); setOpen(true) }}>
        <WechatFilled className={iconClass as any} />
      </a>

      {/* 飞书 */}
      <a href={feishuUrl} className={linkClass} aria-label="飞书" target="_blank" rel="noopener noreferrer">
        {/* 使用与左右相同颜色/尺寸的矢量 */}
        <svg className={iconClass} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17 29C21 29 25 26.9339 28 23.4065C36 14 41.4242 16.8166 44 17.9998C38.5 20.9998 40.5 29.6233 33 35.9998C28.382 39.9259 23.4945 41.014 19 41C12.5231 40.9799 6.86226 37.7637 4 35.4063V16.9998" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.64808 15.8669C5.02231 14.9567 3.77715 14.7261 2.86694 15.3519C1.95673 15.9777 1.72615 17.2228 2.35192 18.1331L5.64808 15.8669ZM36.0021 35.7309C36.958 35.1774 37.2843 33.9539 36.7309 32.9979C36.1774 32.042 34.9539 31.7157 33.9979 32.2691L36.0021 35.7309ZM2.35192 18.1331C5.2435 22.339 10.7992 28.144 16.8865 32.2239C19.9345 34.2667 23.217 35.946 26.449 36.7324C29.6946 37.522 33.0451 37.4428 36.0021 35.7309L33.9979 32.2691C32.2049 33.3072 29.9929 33.478 27.3947 32.8458C24.783 32.2103 21.9405 30.7958 19.1135 28.9011C13.4508 25.106 8.2565 19.661 5.64808 15.8669L2.35192 18.1331Z" fill="currentColor" />
          <path d="M33.5947 17C32.84 14.7027 30.8551 9.94054 27.5947 7H11.5947C15.2174 10.6757 23.0002 16 27.0002 24" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      {/* GitHub */}
      <a href={`https://github.com/${githubUser}`} className={linkClass} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
        <GithubFilled className={iconClass as any} />
      </a>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          aria-modal="true" role="dialog"
        >
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--qr-bg, #ffffff)', borderRadius: 12, padding: 16, maxWidth: 420, width: '90%', boxShadow: '0 20px 40px rgba(0,0,0,.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontWeight: 600, color: 'var(--qr-title, #111827)' }}>微信扫码加好友</div>
              <button onClick={() => setOpen(false)} aria-label="关闭" style={{ color: 'var(--qr-title, #111827)' }}>✕</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img src={wechatQrSrc} alt="微信二维码" style={{ width: '100%', maxWidth: 360, borderRadius: 8 }} />
            </div>
          </div>
          <style jsx>{`
            :global(.dark) {
              --qr-bg: #0f172a;
              --qr-title: #e5e7eb;
            }
          `}</style>
        </div>
      )}
    </div>
  )
}
