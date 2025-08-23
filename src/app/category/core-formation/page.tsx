import Link from 'next/link'
import styles from './page.module.css'

export default function CoreFormationPage() {
  const articles = [
    {
      title: "Redis缓存策略与性能优化",
      slug: "core-formation/redis-caching-strategies",
      excerpt: "深入探讨Redis在高并发系统中的缓存策略设计，包括缓存穿透、击穿、雪崩的解决方案",
      date: "2024-03-15",
      difficulty: "高级",
      tags: ["Redis", "缓存", "性能优化", "高并发"],
      readTime: "45分钟",
      featured: true
    },
    {
      title: "高并发系统架构设计",
      slug: "core-formation/high-concurrency-architecture",
      excerpt: "从零开始设计高并发系统架构，涵盖负载均衡、数据库分片、消息队列等核心技术",
      date: "2024-03-16",
      difficulty: "高级",
      tags: ["高并发", "系统架构", "负载均衡", "分布式"],
      readTime: "50分钟",
      featured: true
    },
    {
      title: "全栈联调与接口设计",
      slug: "core-formation/fullstack-api-design",
      excerpt: "掌握前后端分离架构下的接口设计原则，实现高效的全栈开发协作流程",
      date: "2024-03-17",
      difficulty: "进阶",
      tags: ["全栈", "API设计", "接口规范", "协作"],
      readTime: "40分钟",
      featured: false
    },
    {
      title: "分布式系统一致性保证",
      slug: "core-formation/distributed-consistency",
      excerpt: "深入理解分布式系统中的一致性问题，掌握CAP理论、BASE理论和各种一致性算法",
      date: "2024-03-18",
      difficulty: "高级",
      tags: ["分布式", "一致性", "CAP理论", "算法"],
      readTime: "55分钟",
      featured: false
    }
  ]

  return (
    <>
      {/* 面包屑导航 */}
      <div className={styles.breadcrumb}>
        <nav className={styles.breadcrumbNav}>
          <Link href="/" className={styles.breadcrumbLink}>
            首页
          </Link>
          <svg className={styles.breadcrumbArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/cultivation" className={styles.breadcrumbLink}>
            修炼经历
          </Link>
          <svg className={styles.breadcrumbArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadcrumbCurrent}>结丹期 - 高级架构</span>
        </nav>
      </div>

      <div className={styles.container}>
        {/* 境界介绍 */}
        <div className={styles.intro}>
          <div className={styles.introHeader}>
            <h1 className={styles.title}>
              ⚡ 结丹期 - 高级架构 ⚡
            </h1>
            <p className={styles.description}>
              进入携程结丹初期，开始接触Redis缓存设计、架构设计、全栈联调等高级技能。
              这是从中级向高级工程师进阶的关键阶段，需要具备系统性思维和架构能力。
            </p>
          </div>

          <div className={styles.practicePoints}>
            <h2 className={styles.practiceTitle}>修炼要点</h2>
            <div className={styles.practiceGrid}>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>⚡ 高并发处理</h3>
                <p className={styles.practiceItemDesc}>掌握缓存策略、负载均衡、数据库优化等高并发解决方案</p>
              </div>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>🏛️ 系统架构</h3>
                <p className={styles.practiceItemDesc}>具备大型系统架构设计能力，理解分布式系统原理</p>
              </div>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>🔗 全栈联调</h3>
                <p className={styles.practiceItemDesc}>熟练掌握前后端协作，API设计和接口规范制定</p>
              </div>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>🎯 性能优化</h3>
                <p className={styles.practiceItemDesc}>深入理解性能瓶颈，具备系统性能调优能力</p>
              </div>
            </div>
          </div>
        </div>

        {/* 文章网格 */}
        <div className={styles.articlesSection}>
          <h2 className={styles.articlesTitle}>修炼典籍</h2>
          <div className={styles.articlesGrid}>
            {articles.map((article) => (
              <article key={article.slug} className={styles.articleCard}>
                <div className={styles.articleHeader}>
                  <div className={styles.articleMeta}>
                    <span className={`${styles.badge} ${styles.badgeDifficulty}`}>
                      {article.difficulty}
                    </span>
                    <span className={styles.readTime}>{article.readTime}</span>
                  </div>
                  <h3 className={styles.articleTitle}>
                    <Link href={`/posts/${article.slug}`} className={styles.articleLink}>
                      {article.title}
                    </Link>
                  </h3>
                  <p className={styles.articleExcerpt}>
                    {article.excerpt}
                  </p>
                </div>
                <div className={styles.articleFooter}>
                  <div className={styles.articleTags}>
                    {article.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className={`${styles.badge} ${styles.badgeTag}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={styles.articleInfo}>
                    <span className={styles.articleDate}>{article.date}</span>
                    {article.featured && (
                      <span className={`${styles.badge} ${styles.badgeFeatured}`}>
                        推荐
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 修炼进度 */}
        <div className={styles.progressSection}>
          <h2 className={styles.progressTitle}>结丹期修炼进度</h2>
          <div className={styles.progressList}>
            <div className={styles.progressItem}>
              <span className={styles.progressLabel}>缓存架构设计</span>
              <div className={styles.progressBar}>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: '90%' }}></div>
                </div>
                <span className={styles.progressPercent}>90%</span>
              </div>
            </div>
            <div className={styles.progressItem}>
              <span className={styles.progressLabel}>高并发系统</span>
              <div className={styles.progressBar}>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: '80%' }}></div>
                </div>
                <span className={styles.progressPercent}>80%</span>
              </div>
            </div>
            <div className={styles.progressItem}>
              <span className={styles.progressLabel}>分布式架构</span>
              <div className={styles.progressBar}>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: '75%' }}></div>
                </div>
                <span className={styles.progressPercent}>75%</span>
              </div>
            </div>
          </div>
          <div className={styles.progressTip}>
            <p className={styles.progressTipText}>
              💡 提示：继续深化架构设计能力，为元婴期的AI技术做好准备！
            </p>
          </div>
        </div>

        {/* 相关链接 */}
        <div className={styles.relatedSection}>
          <h3 className={styles.relatedTitle}>相关修炼</h3>
          <div className={styles.relatedGrid}>
            <Link href="/category/foundation" className={styles.relatedCard}>
              <div className={styles.relatedCardContent}>
                <span className={styles.relatedIcon}>🏗️</span>
                <div>
                  <h4 className={styles.relatedCardTitle}>筑基期</h4>
                  <p className={styles.relatedCardDesc}>全栈开发技能</p>
                </div>
              </div>
            </Link>
            <Link href="/category/nascent-soul" className={styles.relatedCard}>
              <div className={styles.relatedCardContent}>
                <span className={styles.relatedIcon}>🤖</span>
                <div>
                  <h4 className={styles.relatedCardTitle}>元婴期</h4>
                  <p className={styles.relatedCardDesc}>AI技术应用</p>
                </div>
              </div>
            </Link>
            <Link href="/cultivation" className={styles.relatedCard}>
              <div className={styles.relatedCardContent}>
                <span className={styles.relatedIcon}>🗺️</span>
                <div>
                  <h4 className={styles.relatedCardTitle}>修炼地图</h4>
                  <p className={styles.relatedCardDesc}>查看完整修炼路径</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
