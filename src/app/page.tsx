import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default async function Home() {
  const posts = await getAllPosts()
  const featuredPosts = posts.filter(post => post.featured)
  const recentPosts = posts.slice(0, 6)

  return (
    <>
      {/* 面包屑导航 */}
      <div className="px-6 py-4 border-b border-gray-200">
        <nav className="flex items-center text-sm text-gray-500">
          <span className="text-gray-900 font-medium">首页</span>
        </nav>
      </div>

      <div className="p-6">
        {/* 特色文章 */}
        {featuredPosts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">特色文章</h2>
            <div className="grid gap-6">
              {featuredPosts.map((post) => (
                <Card key={post.slug} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          特色
                        </Badge>
                        <Badge variant="outline">
                          {post.category}
                        </Badge>
                      </div>
                      <time className="text-sm text-gray-500">
                        {post.date}
                      </time>
                    </div>
                    <CardTitle className="text-xl">
                      <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-base">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img 
                          src={post.author.avatar || "/images/default-avatar.jpg"} 
                          alt={post.author.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-gray-600">{post.author.name}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 最新文章 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">最新文章</h2>
            <Link href="/posts" className="text-blue-600 hover:text-blue-800 font-medium">
              查看全部 →
            </Link>
          </div>
          
          <div className="grid gap-6">
            {recentPosts.map((post) => (
              <Card key={post.slug} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {post.category}
                      </Badge>
                    </div>
                    <time className="text-sm text-gray-500">
                      {post.date}
                    </time>
                  </div>
                  <CardTitle className="text-lg">
                    <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img 
                        src={post.author.avatar || "/images/default-avatar.jpg"} 
                        alt={post.author.name}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="text-sm text-gray-600">{post.author.name}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* 热门分类 */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">热门分类</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: '前端开发', count: 12, icon: '🌐' },
              { name: '后端开发', count: 8, icon: '⚙️' },
              { name: '人工智能', count: 6, icon: '🤖' },
              { name: 'DevOps', count: 5, icon: '🔧' },
              { name: '开发工具', count: 7, icon: '🛠️' },
              { name: '技术分享', count: 4, icon: '📚' },
            ].map((category) => (
              <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.count} 篇文章</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{posts.length}</div>
              <div className="text-sm text-gray-600">总文章数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">6</div>
              <div className="text-sm text-gray-600">文章分类</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">1.2k</div>
              <div className="text-sm text-gray-600">总浏览量</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 