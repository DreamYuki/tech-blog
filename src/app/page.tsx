import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { BlogPost } from '@/types'
import { formatDate } from '@/lib/utils'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BackgroundAudioPlayer } from '@/components/BackgroundAudioPlayer'

export const metadata: Metadata = {
  title: '技术博客 - 首页',
  description: '欢迎来到我的技术博客，分享前端、后端、人工智能等技术文章',
}

export default async function Home() {
  const posts = await getAllPosts()
  const featuredPosts = posts.slice(0, 3)
  const recentPosts = posts.slice(3, 9)

  return (
    <>
      <main className="min-h-screen">
        {/* 头部导航 */}
        <header className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">技术博客</h1>
                <p className="text-gray-600 mt-1">分享技术见解与创新</p>
              </div>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-900 hover:text-blue-600 transition-colors">
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

        {/* 英雄区域 */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              欢迎来到我的技术博客
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              在这里，我分享前端开发、后端架构、人工智能等技术文章，
              以及音频、视频内容，与你一起探索技术的无限可能。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/posts"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                开始阅读
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                了解更多
              </Link>
            </div>
          </div>
        </section>

        {/* 精选文章 */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">精选文章</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-xl mb-2">
                      <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readTime}分钟阅读</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 最新文章 */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">最新文章</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <Card key={post.slug} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-lg mb-2">
                      <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readTime}分钟阅读</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/posts"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                查看所有文章
              </Link>
            </div>
          </div>
        </section>

        {/* 底部 */}
        <footer className="bg-gray-900 text-white py-12">
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
      </main>

      {/* 背景音乐播放器 */}
      <BackgroundAudioPlayer />
    </>
  )
} 