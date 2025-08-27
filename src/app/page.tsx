import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import styles from './page.module.css'

export default async function Home() {
  const posts = await getAllPosts()
  const featuredPosts = posts.filter(post => post.featured)
  const recentPosts = posts.slice(0, 6)

  return (
    <>
      {/* 面包屑导航 */}
      <div className={styles.breadcrumb}>
        <nav className={styles.breadcrumbNav}>
          <span className={styles.breadcrumbCurrent}>首页</span>
        </nav>
      </div>

      <div className={styles.pageContent}>
        {/* 特色文章 */}
        {featuredPosts.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>特色文章</h2>
            <div className={styles.postGrid}>
              {featuredPosts.map((post) => (
                <article key={post.slug} className={styles.featuredPost}>
                  <div className={styles.postHeader}>
                    <div className={styles.postMeta}>
                      <div className={styles.postBadges}>
                        <span className={`${styles.badge} ${styles.badgeFeatured}`}>
                          特色
                        </span>
                        <span className={`${styles.badge} ${styles.badgeCategory}`}>
                          {post.category}
                        </span>
                      </div>
                      <time className={styles.postDate}>
                        {post.date}
                      </time>
                    </div>
                    <h3 className={styles.postTitle}>
                      <Link href={`/posts/${post.slug}`} className={styles.postLink}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className={styles.postExcerpt}>
                      {post.excerpt}
                    </p>
                  </div>
                  <div className={styles.postFooter}>
                    <div className={styles.postTags}>
                      {post.tags.map((tag) => (
                        <span key={tag} className={`${styles.badge} ${styles.badgeTag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* 最新文章 */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>最新文章</h2>
            <Link href="/posts" className={styles.viewAllLink}>
              查看全部 →
            </Link>
          </div>

          <div className={styles.postGrid}>
            {recentPosts.map((post) => (
              <article key={post.slug} className={styles.postCard}>
                <div className={styles.postHeader}>
                  <div className={styles.postMeta}>
                    <div className={styles.postBadges}>
                      <span className={`${styles.badge} ${styles.badgeCategory}`}>
                        {post.category}
                      </span>
                    </div>
                    <time className={styles.postDate}>
                      {post.date}
                    </time>
                  </div>
                  <h3 className={styles.postTitle}>
                    <Link href={`/posts/${post.slug}`} className={styles.postLink}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className={styles.postExcerpt}>
                    {post.excerpt}
                  </p>
                </div>
                <div className={styles.postFooter}>
                  <div className={styles.postTags}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className={`${styles.badge} ${styles.badgeTag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 热门分类 */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>热门分类</h2>
          <div className={styles.categoryGrid}>
            {[
              { name: '前端开发', count: 12, icon: '🌐' },
              { name: '后端开发', count: 8, icon: '⚙️' },
              { name: '人工智能', count: 6, icon: '🤖' },
              { name: 'DevOps', count: 5, icon: '🔧' },
              { name: '开发工具', count: 7, icon: '🛠️' },
              { name: '技术分享', count: 4, icon: '📚' },
            ].map((category) => (
              <div key={category.name} className={styles.categoryCard}>
                <div className={styles.categoryContent}>
                  <div className={styles.categoryInfo}>
                    <span className={styles.categoryIcon}>{category.icon}</span>
                    <div>
                      <h3 className={styles.categoryName}>{category.name}</h3>
                      <p className={styles.categoryCount}>{category.count} 篇文章</p>
                    </div>
                  </div>
                  <svg className={styles.categoryArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 统计信息 */}
        <div className={styles.statsSection}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={`${styles.statNumber} ${styles.statBlue}`}>{posts.length}</div>
              <div className={styles.statLabel}>总文章数</div>
            </div>
            <div className={styles.statItem}>
              <div className={`${styles.statNumber} ${styles.statGreen}`}>6</div>
              <div className={styles.statLabel}>文章分类</div>
            </div>
            <div className={styles.statItem}>
              <div className={`${styles.statNumber} ${styles.statPurple}`}>1.2k</div>
              <div className={styles.statLabel}>总浏览量</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 