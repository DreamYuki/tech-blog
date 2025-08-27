import Link from 'next/link'
import styles from './page.module.css'
import { getAllPosts } from '@/lib/posts'

function fuzzyMatchScore(text: string, query: string): number {
  const t = text.toLowerCase()
  const q = query.toLowerCase()
  if (t.includes(q)) return q.length * 10
  // 简单子序列匹配
  let i = 0, j = 0, score = 0
  while (i < t.length && j < q.length) {
    if (t[i] === q[j]) { score += 2; j++ }
    i++
  }
  return j === q.length ? score : 0
}

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const q = (searchParams.q || '').trim()
  const posts = await getAllPosts()

  let results: { slug: string; title: string; excerpt: string; date: string; score: number }[] = []
  if (q) {
    results = posts.map(p => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt || '',
      date: p.date,
      score: Math.max(
        fuzzyMatchScore(p.title || '', q),
        fuzzyMatchScore(p.excerpt || '', q),
        fuzzyMatchScore(p.content || '', q),
        fuzzyMatchScore(p.category || '', q),
        (p.tags || []).reduce((m, tag) => Math.max(m, fuzzyMatchScore(tag, q)), 0)
      )
    }))
      .filter(r => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 50)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>搜索结果</h1>
      {!q && <p className={styles.hint}>请输入关键词后在头部搜索框按回车</p>}
      {q && results.length === 0 && (
        <p className={styles.hint}>没有找到与“{q}”相关的文章</p>
      )}
      {q && results.length > 0 && (
        <div className={styles.list}>
          {results.map(r => (
            <article key={r.slug} className={styles.item}>
              <div className={styles.itemHeader}>
                <time className={styles.date}>{r.date}</time>
                <h2 className={styles.itemTitle}>
                  <Link href={`/posts/${r.slug}`} className={styles.itemLink}>{r.title}</Link>
                </h2>
              </div>
              {r.excerpt && <p className={styles.itemExcerpt}>{r.excerpt}</p>}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
