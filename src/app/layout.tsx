import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: '技术博客 - 分享技术见解与创新',
  description: '一个现代化的技术博客，分享前端、后端、人工智能等技术文章，支持音频、视频内容',
  keywords: ['技术博客', '前端开发', '后端开发', '人工智能', '编程', '技术分享'],
  authors: [{ name: '技术博主' }],
  creator: '技术博主',
  openGraph: {
    title: '技术博客 - 分享技术见解与创新',
    description: '一个现代化的技术博客，分享前端、后端、人工智能等技术文章',
    url: 'https://tech-blog.com',
    siteName: '技术博客',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: '技术博客',
      },
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '技术博客 - 分享技术见解与创新',
    description: '一个现代化的技术博客，分享前端、后端、人工智能等技术文章',
    images: ['/images/og-image.png'],
    creator: '@tech_blogger',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-900 antialiased`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
} 