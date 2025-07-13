import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { BackgroundAudioPlayer } from '@/components/BackgroundAudioPlayer'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'

interface PostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: '文章未找到 - 技术博客',
      description: '抱歉，您访问的文章不存在。',
    }
  }

  return {
    title: `${post.title} - 技术博客`,
    description: post.excerpt,
    keywords: post.tags,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* 头部导航 */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                  技术博客
                </Link>
                <p className="text-gray-600 mt-1">分享技术见解与创新</p>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  首页
                </Link>
                <Link href="/posts" className="text-gray-600 hover:text-blue-600 transition-colors">
                  所有文章
                </Link>
                <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">
                  分类
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  关于
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* 文章内容 */}
        <main className="container mx-auto px-4 py-12">
          <article className="max-w-4xl mx-auto">
            {/* 文章头部 */}
            <header className="mb-12">
              <div className="text-center mb-8">
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  <Badge variant="secondary">{post.category}</Badge>
                  {post.featured && (
                    <Badge variant="default">精选文章</Badge>
                  )}
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                  <span>作者: {post.author.name}</span>
                  <span>•</span>
                  <span>{formatDate(post.date)}</span>
                  <span>•</span>
                  <span>{post.readTime} 分钟阅读</span>
                </div>
              </div>
            </header>

            {/* 文章正文 */}
            <div className="bg-white rounded-lg shadow-sm border p-8 md:p-12">
              <MarkdownRenderer content={post.content} />
            </div>

            {/* 导航 */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <Link
                  href="/posts"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  ← 返回文章列表
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  返回首页
                </Link>
              </div>
            </div>
          </article>
        </main>
      </div>

      {/* 背景音乐播放器 */}
      <BackgroundAudioPlayer />
    </>
  )
} 