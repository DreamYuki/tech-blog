import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
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
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      {/* 面包屑导航 */}
      <div className="px-6 py-4 border-b border-gray-200">
        <nav className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            首页
          </Link>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/posts" className="hover:text-gray-700">
            文章
          </Link>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-gray-900 font-medium truncate">
            {post.title}
          </span>
        </nav>
      </div>

      {/* 文章内容 */}
      <article className="p-6">
        {/* 文章头部 */}
        <header className="mb-8">
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <Badge variant="outline">
                {post.category}
              </Badge>
              {post.featured && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  特色
                </Badge>
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {post.excerpt}
            </p>
          </div>

          {/* 文章元信息 */}
          <div className="flex items-center justify-between py-4 border-y border-gray-200">
            <div className="flex items-center space-x-4">
              <img 
                src={post.author.avatar || "/images/default-avatar.jpg"} 
                alt={post.author.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.author.email}</p>
              </div>
            </div>
            <div className="text-right">
              <time className="text-sm text-gray-500 block">
                发布于 {post.date}
              </time>
              <p className="text-sm text-gray-500">
                约 {Math.ceil(post.content.length / 500)} 分钟阅读
              </p>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </header>

        {/* 文章正文 */}
        <div className="prose prose-lg max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* 文章底部 */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>点赞</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                <span>分享</span>
              </button>
            </div>
            <div className="text-sm text-gray-500">
              最后更新: {post.date}
            </div>
          </div>
        </footer>
      </article>
    </>
  )
} 