import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import styles from './layout.module.css'
import { BackgroundAudioPlayer } from '@/components/BackgroundAudioPlayer'
import { AudioProvider } from '@/contexts/AudioContext'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import SearchBox from '@/components/SearchBox'
import SocialLinks from '@/components/SocialLinks'
import { WechatFilled, GithubFilled } from '@ant-design/icons'

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
                      关于我
                    </Link>
                  </nav>

                  {/* 搜索和主题切换 */}
                  <div className={styles.headerActions}>
                    <div className={styles.searchContainer}>
                      <SearchBox className={styles.searchInput} placeholder="搜索文章..." />
                      <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <ThemeToggle className={styles.themeButton} />
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
                    {/* 相关文章 */}
                    <div className={styles.sidebarCard}>
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
                      <h2 className={styles.sidebarTitle}>联系我</h2>
                      <SocialLinks
                        containerClass={styles.socialLinks}
                        linkClass={styles.socialLink}
                        iconClass={styles.socialIcon}
                        feishuUrl="https://www.larkenterprise.com/invitation/page/add_contact/?token=863pe6f0-1618-4844-8fa3-7be45eab89d6&unique_id=3RXYOPwpFDHGF4kPNasxqA=="
                        githubUser="DreamYuki"
                        wechatQrSrc="/images/IMG_9628.JPG"
                      />
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