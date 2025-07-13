import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export const metadata: Metadata = {
  title: '所有文章 - 技术博客',
  description: '浏览所有技术文章，包括前端开发、后端开发、人工智能等内容',
}

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
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
              <Link href="/posts" className="text-gray-900 hover:text-blue-600 transition-colors">
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

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">所有文章</h1>
            <p className="text-xl text-gray-600">
              探索技术的无限可能，分享知识与经验
            </p>
          </div>

          {/* 文章统计 */}
          <div className="mb-8 p-6 bg-white rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">文章统计</h2>
                <p className="text-gray-600">共 {posts.length} 篇文章</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">最近更新</p>
                <p className="text-gray-900">{posts.length > 0 ? formatDate(posts[0].date) : '暂无文章'}</p>
              </div>
            </div>
          </div>

          {/* 文章列表 */}
          {posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      {post.featured && (
                        <Badge variant="default">精选</Badge>
                      )}
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-2xl mb-3">
                      <Link 
                        href={`/posts/${post.slug}`} 
                        className="hover:text-blue-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-lg leading-relaxed">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>{formatDate(post.date)}</span>
                        <span>•</span>
                        <span>{post.readTime} 分钟阅读</span>
                        <span>•</span>
                        <span>by {post.author.name}</span>
                      </div>
                      <Link
                        href={`/posts/${post.slug}`}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        阅读全文 →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">暂无文章</h3>
                <p className="text-gray-600 mb-6">
                  还没有发布任何文章，请稍后再来查看。
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  返回首页
                </Link>
              </div>
            </div>
          )}

          {/* 分页 - 暂时隐藏，未来可以添加 */}
          {posts.length > 10 && (
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50" disabled>
                  上一页
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                  1
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  下一页
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 底部 */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h4 className="text-2xl font-bold mb-4">技术博客</h4>
          <p className="text-gray-400 mb-8">
            分享技术见解与创新，探索技术的无限可能
          </p>
          <div className="flex justify-center space-x-8">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              首页
            </Link>
            <Link href="/posts" className="text-gray-400 hover:text-white transition-colors">
              文章
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
              关于
            </Link>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-gray-400">
            <p>&copy; 2024 技术博客. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 