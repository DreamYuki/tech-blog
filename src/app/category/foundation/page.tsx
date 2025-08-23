import Link from 'next/link'
import styles from './page.module.css'

export default function FoundationPage() {
  const articles = [
    {
      title: "NestJS企业级架构设计最佳实践",
      slug: "foundation/nestjs-architecture-best-practices",
      excerpt: "深入探讨NestJS在企业级应用中的架构设计模式，包括模块化、依赖注入、中间件等核心概念",
      date: "2024-02-15",
      difficulty: "进阶",
      tags: ["NestJS", "架构设计", "后端开发", "企业级"],
      readTime: "35分钟",
      featured: true
    },
    {
      title: "Kotlin协程在Android中的应用",
      slug: "foundation/kotlin-coroutines-android",
      excerpt: "掌握Kotlin协程的核心概念，在Android开发中实现高效的异步编程和并发处理",
      date: "2024-02-16",
      difficulty: "进阶",
      tags: ["Kotlin", "协程", "Android", "异步编程"],
      readTime: "40分钟",
      featured: false
    },
    {
      title: "GCP云原生部署实战",
      slug: "foundation/gcp-cloud-native-deployment",
      excerpt: "从零开始学习Google Cloud Platform的云原生部署，包括容器化、Kubernetes、CI/CD等",
      date: "2024-02-17",
      difficulty: "进阶",
      tags: ["GCP", "云原生", "Kubernetes", "DevOps"],
      readTime: "45分钟",
      featured: false
    },
    {
      title: "微服务架构设计模式",
      slug: "foundation/microservices-design-patterns",
      excerpt: "深入理解微服务架构的设计模式，包括服务拆分、通信机制、数据一致性等关键问题",
      date: "2024-02-18",
      difficulty: "高级",
      tags: ["微服务", "架构设计", "分布式", "设计模式"],
      readTime: "50分钟",
      featured: true
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
          <span className={styles.breadcrumbCurrent}>筑基期 - 全栈开发</span>
        </nav>
      </div>

      <div className={styles.container}>
        {/* 境界介绍 */}
        <div className={styles.intro}>
          <div className={styles.introHeader}>
            <h1 className={styles.title}>
              🏗️ 筑基期 - 全栈开发 🏗️
            </h1>
            <p className={styles.description}>
              从前端基础到全栈开发，掌握NestJS、Kotlin、GCP部署等技能。
              这是从初级向中级进阶的关键阶段，需要建立完整的技术体系。
            </p>
          </div>

          <div className={styles.practicePoints}>
            <h2 className={styles.practiceTitle}>修炼要点</h2>
            <div className={styles.practiceGrid}>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>🎯 全栈思维</h3>
                <p className={styles.practiceItemDesc}>从前端到后端，从开发到部署，建立完整的技术栈认知</p>
              </div>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>🏗️ 架构设计</h3>
                <p className={styles.practiceItemDesc}>学习企业级架构设计，掌握模块化和可扩展性原则</p>
              </div>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>☁️ 云原生</h3>
                <p className={styles.practiceItemDesc}>掌握容器化部署、微服务架构、云平台服务</p>
              </div>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>🚀 工程化</h3>
                <p className={styles.practiceItemDesc}>建立完善的开发流程，包括测试、CI/CD、监控等</p>
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
          <h2 className={styles.progressTitle}>筑基期修炼进度</h2>
          <div className={styles.progressList}>
            <div className={styles.progressItem}>
              <span className={styles.progressLabel}>后端框架掌握</span>
              <div className={styles.progressBar}>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: '85%' }}></div>
                </div>
                <span className={styles.progressPercent}>85%</span>
              </div>
            </div>
            <div className={styles.progressItem}>
              <span className={styles.progressLabel}>云平台部署</span>
              <div className={styles.progressBar}>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: '70%' }}></div>
                </div>
                <span className={styles.progressPercent}>70%</span>
              </div>
            </div>
            <div className={styles.progressItem}>
              <span className={styles.progressLabel}>架构设计能力</span>
              <div className={styles.progressBar}>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: '65%' }}></div>
                </div>
                <span className={styles.progressPercent}>65%</span>
              </div>
            </div>
          </div>
          <div className={styles.progressTip}>
            <p className={styles.progressTipText}>
              💡 提示：继续深化全栈技能，为结丹期的高级架构做好准备！
            </p>
          </div>
        </div>

        {/* 相关链接 */}
        <div className={styles.relatedSection}>
          <h3 className={styles.relatedTitle}>相关修炼</h3>
          <div className={styles.relatedGrid}>
            <Link href="/category/qi-refining" className={styles.relatedCard}>
              <div className={styles.relatedCardContent}>
                <span className={styles.relatedIcon}>🧘‍♂️</span>
                <div>
                  <h4 className={styles.relatedCardTitle}>炼气期</h4>
                  <p className={styles.relatedCardDesc}>前端基础技能</p>
                </div>
              </div>
            </Link>
            <Link href="/category/core-formation" className={styles.relatedCard}>
              <div className={styles.relatedCardContent}>
                <span className={styles.relatedIcon}>⚡</span>
                <div>
                  <h4 className={styles.relatedCardTitle}>结丹期</h4>
                  <p className={styles.relatedCardDesc}>高级架构设计</p>
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
