import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import Link from 'next/link'
import styles from './page.module.css'

interface PostPageProps {
  params: {
    slug: string[]
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const slugPath = params.slug.join('/')
  const post = await getPostBySlug(slugPath)

  if (!post) {
    return {}
  }

  return {
    title: `${post.title} - 技术博客`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const slugPath = params.slug.join('/')
  const post = await getPostBySlug(slugPath)

  if (!post) {
    notFound()
  }

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
          <Link href="/posts" className={styles.breadcrumbLink}>
            文章
          </Link>
          <svg className={styles.breadcrumbArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className={styles.breadcrumbCurrent}>
            {post.title}
          </span>
        </nav>
      </div>

      {/* 文章内容 */}
      <article className={styles.article}>
        {/* 文章头部 */}
        <header className={styles.articleHeader}>
          <div className={styles.articleMeta}>
            <div className={styles.articleBadges}>
              <span className={`${styles.badge} ${styles.badgeCategory}`}>
                {post.category}
              </span>
              {post.featured && (
                <span className={`${styles.badge} ${styles.badgeFeatured}`}>
                  特色
                </span>
              )}
            </div>
            <h1 className={styles.articleTitle}>
              {post.title}
            </h1>
            <p className={styles.articleExcerpt}>
              {post.excerpt}
            </p>
          </div>

          {/* 文章元信息 */}
          <div className={styles.articleInfo}>
            <div className={styles.authorInfo}>
              <img
                src={post.author.avatar || "/images/default-avatar.jpg"}
                alt={post.author.name}
                className={styles.authorAvatar}
              />
              <div>
                <p className={styles.authorName}>{post.author.name}</p>
                <p className={styles.authorEmail}>{post.author.email}</p>
              </div>
            </div>
            <div className={styles.publishInfo}>
              <time className={styles.publishDate}>
                发布于 {post.date}
              </time>
              <p className={styles.readTime}>
                约 {Math.ceil(post.content.length / 500)} 分钟阅读
              </p>
            </div>
          </div>

          {/* 标签 */}
          <div className={styles.articleTags}>
            {post.tags.map((tag) => (
              <span key={tag} className={`${styles.badge} ${styles.badgeTag}`}>
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* 文章正文 */}
        <div className={styles.articleContent}>
          <MarkdownRenderer content={post.content} />
        </div>

        {/* 文章底部 */}
        <footer className={styles.articleFooter}>
          <div className={styles.articleActions}>
            <div className={styles.actionButtons}>
              <button className={styles.actionButton}>
                <svg className={styles.actionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>点赞</span>
              </button>
              <button className={styles.actionButton}>
                <svg className={styles.actionIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>分享</span>
              </button>
            </div>
            <div className={styles.updateInfo}>
              最后更新: {post.date}
            </div>
          </div>
        </footer>
      </article>
    </>
  )
}
