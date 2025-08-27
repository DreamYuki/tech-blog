import Link from 'next/link'
import styles from './page.module.css'

export default function PostsIndexPage() {
  const categories = [
    { href: '/category/qi-refining', title: '炼气期 - 前端基础', emoji: '🧘‍♂️' },
    { href: '/category/foundation', title: '筑基期 - 全栈开发', emoji: '🏗️' },
    { href: '/category/core-formation', title: '结丹期 - 架构设计', emoji: '⚡' },
    { href: '/category/nascent-soul', title: '元婴期 - AI技术', emoji: '🤖' },
  ]

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>所有文章</h1>
      <p className={styles.subtitle}>按修行阶段浏览文章</p>
      <div className={styles.grid}>
        {categories.map((c) => (
          <Link key={c.href} href={c.href} className={styles.card}>
            <span className={styles.emoji}>{c.emoji}</span>
            <div>
              <div className={styles.cardTitle}>{c.title}</div>
              <div className={styles.cardDesc}>点击进入分类目录</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
