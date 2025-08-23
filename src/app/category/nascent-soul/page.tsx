import Link from 'next/link'
import styles from './page.module.css'

export default function NascentSoulPage() {
  const articles = [
    {
      title: "向量数据库设计与应用",
      slug: "nascent-soul/vector-database-design",
      excerpt: "深入探讨向量数据库在AI应用中的设计原理，包括向量索引、相似度搜索、性能优化等核心技术",
      date: "2024-04-15",
      difficulty: "专家",
      tags: ["向量数据库", "AI", "机器学习", "搜索引擎"],
      readTime: "60分钟",
      featured: true
    },
    {
      title: "大语言模型微调技术",
      slug: "nascent-soul/llm-fine-tuning",
      excerpt: "掌握大语言模型的微调技术，包括LoRA、QLoRA等参数高效微调方法，以及领域适应策略",
      date: "2024-04-16",
      difficulty: "专家",
      tags: ["LLM", "微调", "LoRA", "深度学习"],
      readTime: "70分钟",
      featured: true
    },
    {
      title: "AI应用架构设计",
      slug: "nascent-soul/ai-application-architecture",
      excerpt: "设计可扩展的AI应用架构，涵盖模型服务化、推理优化、数据流管理等关键技术",
      date: "2024-04-17",
      difficulty: "专家",
      tags: ["AI架构", "模型部署", "推理优化", "MLOps"],
      readTime: "55分钟",
      featured: false
    },
    {
      title: "多模态AI系统集成",
      slug: "nascent-soul/multimodal-ai-integration",
      excerpt: "构建多模态AI系统，整合文本、图像、音频等多种数据类型，实现更智能的人机交互",
      date: "2024-04-18",
      difficulty: "专家",
      tags: ["多模态", "AI集成", "深度学习", "人机交互"],
      readTime: "65分钟",
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
          <span className={styles.breadcrumbCurrent}>元婴期 - AI技术</span>
        </nav>
      </div>

      <div className={styles.container}>
        {/* 境界介绍 */}
        <div className={styles.intro}>
          <div className={styles.introHeader}>
            <h1 className={styles.title}>
              🤖 元婴期 - AI技术 🤖
            </h1>
            <p className={styles.description}>
              结丹后期开始接触AI大模型应用，向量数据库、模型微调等前沿技术。
              这是技术修炼的最高境界，需要具备前瞻性思维和创新能力。
            </p>
          </div>

          <div className={styles.practicePoints}>
            <h2 className={styles.practiceTitle}>修炼要点</h2>
            <div className={styles.practiceGrid}>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>🧠 AI原理</h3>
                <p className={styles.practiceItemDesc}>深入理解机器学习、深度学习原理，掌握AI技术本质</p>
              </div>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>🔧 模型工程</h3>
                <p className={styles.practiceItemDesc}>具备模型训练、微调、部署的完整工程能力</p>
              </div>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>🌐 系统集成</h3>
                <p className={styles.practiceItemDesc}>将AI技术与传统系统深度集成，创造商业价值</p>
              </div>
              <div className={styles.practiceItem}>
                <h3 className={styles.practiceItemTitle}>🚀 创新应用</h3>
                <p className={styles.practiceItemDesc}>探索AI技术的创新应用场景，引领技术发展趋势</p>
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
          <h2 className={styles.progressTitle}>元婴期修炼进度</h2>
          <div className={styles.progressList}>
            <div className={styles.progressItem}>
              <span className={styles.progressLabel}>AI理论基础</span>
              <div className={styles.progressBar}>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: '95%' }}></div>
                </div>
                <span className={styles.progressPercent}>95%</span>
              </div>
            </div>
            <div className={styles.progressItem}>
              <span className={styles.progressLabel}>模型工程化</span>
              <div className={styles.progressBar}>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: '85%' }}></div>
                </div>
                <span className={styles.progressPercent}>85%</span>
              </div>
            </div>
            <div className={styles.progressItem}>
              <span className={styles.progressLabel}>创新应用</span>
              <div className={styles.progressBar}>
                <div className={styles.progressBarBg}>
                  <div className={styles.progressBarFill} style={{ width: '70%' }}></div>
                </div>
                <span className={styles.progressPercent}>70%</span>
              </div>
            </div>
          </div>
          <div className={styles.progressTip}>
            <p className={styles.progressTipText}>
              💡 提示：已达到技术修炼的最高境界，继续探索AI技术的无限可能！
            </p>
          </div>
        </div>

        {/* 相关链接 */}
        <div className={styles.relatedSection}>
          <h3 className={styles.relatedTitle}>相关修炼</h3>
          <div className={styles.relatedGrid}>
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
