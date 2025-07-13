import { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: '所有文章 - 技术博客',
  description: '浏览所有技术文章，包括前端、后端、人工智能等各个领域的内容',
}

export default async function PostsPage() {
  const posts = await getAllPosts()
  
  // 按分类分组
  const categories = posts.reduce((acc, post) => {
    const category = post.category || '未分类'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(post)
    return acc
  }, {} as Record<string, typeof posts>)

  // 获取所有标签
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags))).sort()

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
          <span className="text-gray-900 font-medium">所有文章</span>
        </nav>
      </div>

      <div className="p-6">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">所有文章</h1>
          <p className="text-gray-600">
            共 {posts.length} 篇文章，涵盖 {Object.keys(categories).length} 个分类
          </p>
        </div>

        {/* 标签过滤器 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">按标签筛选</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
              全部
            </Badge>
            {allTags.map((tag) => (
              <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-blue-100">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* 按分类显示文章 */}
        {Object.entries(categories).map(([category, categoryPosts]) => (
          <div key={category} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
              <span className="text-sm text-gray-500">{categoryPosts.length} 篇文章</span>
            </div>
            
            <div className="grid gap-6">
              {categoryPosts.map((post) => (
                <Card key={post.slug} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          {post.category}
                        </Badge>
                        {post.featured && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            特色
                          </Badge>
                        )}
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
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {post.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{post.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* 分页（暂时不实现） */}
        {posts.length > 10 && (
          <div className="mt-12 border-t border-gray-200 pt-8">
            <div className="flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  上一页
                </button>
                <span className="px-3 py-2 text-sm bg-blue-600 text-white rounded">
                  1
                </span>
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  2
                </button>
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  3
                </button>
                <span className="px-3 py-2 text-sm text-gray-500">
                  ...
                </span>
                <button className="px-3 py-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                  下一页
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* 统计信息 */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
              <div className="text-sm text-gray-600">总文章数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{Object.keys(categories).length}</div>
              <div className="text-sm text-gray-600">分类数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{allTags.length}</div>
              <div className="text-sm text-gray-600">标签数</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{posts.filter(p => p.featured).length}</div>
              <div className="text-sm text-gray-600">特色文章</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 