import Link from 'next/link'
import styles from './page.module.css'

export default function CultivationPage() {
  const stages = [
    { href: '/category/qi-refining', title: '炼气期 - 前端基础', desc: 'HTML/CSS/JavaScript基础', emoji: '🧘‍♂️' },
    { href: '/category/foundation', title: '筑基期 - 全栈开发', desc: 'NestJS/Kotlin/GCP部署', emoji: '🏗️' },
    { href: '/category/core-formation', title: '结丹期 - 架构设计', desc: 'Redis/高并发/分布式', emoji: '⚡' },
    { href: '/category/nascent-soul', title: '元婴期 - AI技术', desc: '向量数据库/LLM微调/多模态', emoji: '🤖' },
  ]
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>修炼经历</h1>
      <p className={styles.subtitle}>按修行阶段探索内容</p>
      <div className={styles.grid}>
        {stages.map(s => (
          <Link key={s.href} href={s.href} className={styles.card}>
            <span className={styles.emoji}>{s.emoji}</span>
            <div>
              <div className={styles.cardTitle}>{s.title}</div>
              <div className={styles.cardDesc}>{s.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
