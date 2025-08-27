import { NextResponse } from 'next/server'
import { getAllPosts } from '@/lib/posts'

function fuzzyMatchScore(text: string, query: string): number {
  if (!text || !query) return 0
  const t = text.toLowerCase()
  const q = query.toLowerCase()
  if (t.includes(q)) return q.length * 10
  let i = 0, j = 0, score = 0
  while (i < t.length && j < q.length) {
    if (t[i] === q[j]) { score += 2; j++ }
    i++
  }
  return j === q.length ? score : 0
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const q = (searchParams.get('q') || '').trim()
    const limitParam = searchParams.get('limit')
    const limit = Math.min(Math.max(Number(limitParam) || 10, 1), 50)

    if (!q) return NextResponse.json({ results: [] })

    const posts = await getAllPosts()
    const results = posts.map(p => ({
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
    .slice(0, limit)

    return NextResponse.json({ results })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Search failed' }, { status: 500 })
  }
}
