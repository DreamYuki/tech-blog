import Link from 'next/link'
import styles from './page.module.css'

export default function QiRefiningPage() {
  const articles = [
    {
      title: "HTML5语义化标签详解",
      slug: "qi-refining/html5-semantic-tags",
      excerpt: "深入理解HTML5语义化标签，掌握现代Web开发的基础技能，提升代码可读性和SEO效果",
      date: "2024-01-15",
      difficulty: "入门",
      tags: ["HTML5", "语义化", "前端基础", "SEO"],
      readTime: "15分钟",
      featured: true
    },
    {
      title: "CSS Grid布局完全指南",
      slug: "qi-refining/css-grid-complete-guide",
      excerpt: "深入理解CSS Grid布局系统，掌握现代CSS布局的核心技能，实现复杂的页面布局",
      date: "2024-01-16",
      difficulty: "入门",
      tags: ["CSS", "Grid", "布局", "前端基础"],
      readTime: "20分钟",
      featured: false
    },
    {
      title: "JavaScript闭包深度解析",
      slug: "qi-refining/javascript-closure-deep-dive",
      excerpt: "深入理解JavaScript闭包机制，掌握函数式编程的核心概念，提升代码质量和性能",
      date: "2024-01-17",
      difficulty: "进阶",
      tags: ["JavaScript", "闭包", "函数式编程", "前端基础"],
      readTime: "25分钟",
      featured: false
    },
    {
      title: "ES6+新特性实战应用",
      slug: "qi-refining/es6-features-practical",
      excerpt: "掌握ES6+新特性的实际应用，提升JavaScript开发效率和代码质量",
      date: "2024-01-18",
      difficulty: "进阶",
      tags: ["JavaScript", "ES6+", "现代语法", "前端基础"],
      readTime: "30分钟",
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
          <span className={styles.breadcrumbCurrent}>炼气期 - 前端基础</span>
        </nav>
      </div>

      <div className={styles.container}>
        {/* 境界介绍 */}
        <div className={styles.intro}>
          <div className={styles.introHeader}>
            <h1 className={styles.title}>
              🧘‍♂️ 炼气期 - 前端基础 🧘‍♂️
            </h1>
            <p className={styles.description}>
              从寂寂无名的外行到校招生入行腾讯，掌握HTML、CSS、JavaScript基础。
              这是修仙路上的第一步，打好基础才能走得更远。
            </p>
          </div>

          <div className={styles.practicePoints}>
            <h2 className={styles.practiceTitle}>修炼要点</h2>
            <div className={styles.practiceGrid}>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>🎯 基础扎实</h3>
                <p className={styles.practiceItemDesc}>HTML语义化、CSS布局、JavaScript核心概念，每个都要掌握透彻</p>
              </div>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>🔄 实践为主</h3>
                <p className={styles.practiceItemDesc}>多写代码，多做项目，在实践中加深理解</p>
              </div>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>📚 标准为先</h3>
                <p className={styles.practiceItemDesc}>关注Web标准发展，学习最新的技术规范</p>
              </div>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>🚀 循序渐进</h3>
                <p className={styles.practiceItemDesc}>从简单到复杂，逐步提升技能水平</p>
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
          <h2 className={styles.progressTitle}>炼气期修炼进度</h2>
          <div className={styles.progressList}>
            <div className={styles.progressItem}>
              <span className={styles.progressLabel}>基础功法掌握</span>
              <div className={styles.progressBar}>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: '75%' }}></div>
                </div>
                <span className={styles.progressPercent}>75%</span>
              </div>
            </div>
            <div className={styles.progressItem}>
              <span className={styles.progressLabel}>实战项目经验</span>
              <div className={styles.progressBar}>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: '60%' }}></div>
                </div>
                <span className={styles.progressPercent}>60%</span>
              </div>
            </div>
            <div className={styles.progressItem}>
              <span className={styles.progressLabel}>技术深度理解</span>
              <div className={styles.progressBar}>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: '50%' }}></div>
                </div>
                <span className={styles.progressPercent}>50%</span>
              </div>
            </div>
          </div>
          <div className={styles.progressTip}>
            <p className={styles.progressTipText}>
              💡 提示：继续修炼这些基础功法，为筑基期做好准备！
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
            <Link href="/cultivation" className={styles.relatedCard}>
              <div className={styles.relatedCardContent}>
                <span className={styles.relatedIcon}>🧘‍♂️</span>
                <div>
                  <h4 className={styles.relatedCardTitle}>修炼经历</h4>
                  <p className={styles.relatedCardDesc}>查看完整修炼体系</p>
                </div>
              </div>
            </Link>
            <Link href="/posts" className={styles.relatedCard}>
              <div className={styles.relatedCardContent}>
                <span className={styles.relatedIcon}>📚</span>
                <div>
                  <h4 className={styles.relatedCardTitle}>所有文章</h4>
                  <p className={styles.relatedCardDesc}>浏览全部技术文章</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}