import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import styles from './layout.module.css'
import { BackgroundAudioPlayer } from '@/components/BackgroundAudioPlayer'
import { AudioProvider } from '@/contexts/AudioContext'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '技术博客 - AI散修的修炼之路',
  description: '记录从炼气期到元婴期的技术修炼历程，分享前端、后端、AI等技术心得',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <AudioProvider>
          <div className={styles.container}>
            {/* 顶部导航栏 */}
            <header className={styles.header}>
              <div className={styles.headerContent}>
                <div className={styles.headerInner}>
                  {/* Logo */}
                  <div className={styles.logo}>
                    <Link href="/" className={styles.logoLink}>
                      AI散修 - Manuel Huang
                    </Link>
                  </div>

                  {/* 主导航 */}
                  <nav className={styles.mainNav}>
                    <Link href="/" className={styles.navLink}>
                      首页
                    </Link>
                    <Link href="/cultivation" className={styles.navLink}>
                      修炼经历
                    </Link>
                    <Link href="/posts" className={styles.navLink}>
                      文章
                    </Link>
                    <Link href="/about" className={styles.navLink}>
                      关于
                    </Link>
                  </nav>

                  {/* 搜索和主题切换 */}
                  <div className={styles.headerActions}>
                    <div className={styles.searchContainer}>
                      <input
                        type="text"
                        placeholder="搜索..."
                        className={styles.searchInput}
                      />
                      <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <button className={styles.themeButton}>
                      <svg className={styles.themeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </button>
                  </div>

                  {/* 移动端菜单按钮 */}
                  <button className={styles.mobileMenuButton}>
                    <svg className={styles.mobileMenuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </header>

            {/* 主要内容区域 */}
            <div className={styles.mainContent}>
              {/* 背景音乐播放器 */}
              <div className={styles.audioPlayer}>
                <BackgroundAudioPlayer />
              </div>

              <div className={styles.mainContentInner}>
                <div className={styles.grid}>

                  {/* 左侧边栏 */}
                  <aside className={styles.leftSidebar}>
                    <div className={styles.sidebarCard}>
                      <h2 className={styles.sidebarTitle}>修炼境界</h2>
                      <nav className={styles.sidebarNav}>
                        <Link href="/category/qi-refining" className={styles.sidebarNavLink}>
                          🧘‍♂️ 炼气期 - 前端基础
                        </Link>
                        <Link href="/category/foundation" className={styles.sidebarNavLink}>
                          🏗️ 筑基期 - 全栈开发
                        </Link>
                        <Link href="/category/core-formation" className={styles.sidebarNavLink}>
                          💎 结丹期 - 架构设计
                        </Link>
                        <Link href="/category/nascent-soul" className={styles.sidebarNavLink}>
                          🚀 元婴期 - AI大模型
                        </Link>
                      </nav>
                    </div>

                    {/* 标签云 */}
                    <div className={`${styles.sidebarCard} ${styles.sidebarSection}`}>
                      <h2 className={styles.sidebarTitle}>热门标签</h2>
                      <div className={styles.tagCloud}>
                        {['React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Docker', 'AI'].map((tag) => (
                          <span key={tag} className={styles.tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 最新文章 */}
                    <div className={`${styles.sidebarCard} ${styles.sidebarSection}`}>
                      <h2 className={styles.sidebarTitle}>最新文章</h2>
                      <div className={styles.articleList}>
                        <Link href="/posts/qi-refining/html5-semantic-tags" className={styles.articleItem}>
                          <div className={styles.articleTitle}>HTML5语义化标签深度解析</div>
                          <div className={styles.articleDate}>2024-01-15</div>
                        </Link>
                        <Link href="/posts/qi-refining/css-grid-complete-guide" className={styles.articleItem}>
                          <div className={styles.articleTitle}>CSS Grid布局完全指南</div>
                          <div className={styles.articleDate}>2024-01-10</div>
                        </Link>
                        <Link href="/posts/qi-refining/javascript-closure-deep-dive" className={styles.articleItem}>
                          <div className={styles.articleTitle}>JavaScript闭包深度剖析</div>
                          <div className={styles.articleDate}>2024-01-05</div>
                        </Link>
                      </div>
                    </div>
                  </aside>

                  {/* 中间内容区域 */}
                  <main className={styles.main}>
                    <div className={styles.mainCard}>
                      {children}
                    </div>
                  </main>

                  {/* 右侧边栏 */}
                  <aside className={styles.rightSidebar}>
                    <div className={styles.sidebarCard}>
                      <h2 className={styles.sidebarTitle}>目录</h2>
                      <nav className={styles.sidebarNav}>
                        <a href="#section1" className={styles.sidebarNavLink}>
                          快速开始
                        </a>
                        <a href="#section2" className={styles.sidebarNavLink}>
                          安装配置
                        </a>
                        <a href="#section3" className={styles.sidebarNavLink}>
                          基础使用
                        </a>
                        <a href="#section4" className={styles.sidebarNavLink}>
                          高级功能
                        </a>
                        <a href="#section5" className={styles.sidebarNavLink}>
                          性能优化
                        </a>
                      </nav>
                    </div>

                    {/* 相关文章 */}
                    <div className={`${styles.sidebarCard} ${styles.sidebarSection}`}>
                      <h2 className={styles.sidebarTitle}>相关文章</h2>
                      <div className={styles.articleList}>
                        <a href="#" className={styles.articleItem}>
                          <div className={styles.articleTitle}>深入理解 React Hooks</div>
                        </a>
                        <a href="#" className={styles.articleItem}>
                          <div className={styles.articleTitle}>现代 CSS 布局技巧</div>
                        </a>
                        <a href="#" className={styles.articleItem}>
                          <div className={styles.articleTitle}>JavaScript 性能优化</div>
                        </a>
                      </div>
                    </div>

                    {/* 社交链接 */}
                    <div className={`${styles.sidebarCard} ${styles.sidebarSection}`}>
                      <h2 className={styles.sidebarTitle}>关注我</h2>
                      <div className={styles.socialLinks}>
                        <a href="#" className={styles.socialLink}>
                          <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                          </svg>
                        </a>
                        <a href="#" className={styles.socialLink}>
                          <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </aside>
                </div>
              </div>
            </div>
          </div>
        </AudioProvider>
      </body>
    </html>
  )
}