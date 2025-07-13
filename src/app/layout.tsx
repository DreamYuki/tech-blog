import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '技术博客 - 现代化的技术分享平台',
  description: '一个现代化的技术博客，分享前端、后端、人工智能等技术文章',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* 顶部导航栏 */}
          <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <a href="/" className="text-2xl font-bold text-gray-900">
                    AI散修
                  </a>
                </div>
                
                {/* 主导航 */}
                <nav className="hidden md:flex items-center space-x-8">
                  <a href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                    首页
                  </a>
                  <a href="/posts" className="text-gray-700 hover:text-blue-600 transition-colors">
                    文章
                  </a>
                  <a href="/categories" className="text-gray-700 hover:text-blue-600 transition-colors">
                    分类
                  </a>
                  <a href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                    关于
                  </a>
                </nav>
                
                {/* 搜索和主题切换 */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="搜索..."
                      className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <button className="p-2 rounded-lg hover:bg-gray-100">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>
          
          {/* 主要内容区域 */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* 左侧边栏 */}
              <aside className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">分类</h2>
                  <nav className="space-y-2">
                    <a href="/category/frontend" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      前端开发
                    </a>
                    <a href="/category/backend" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      后端开发
                    </a>
                    <a href="/category/ai" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      人工智能
                    </a>
                    <a href="/category/devops" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      DevOps
                    </a>
                    <a href="/category/tools" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                      开发工具
                    </a>
                  </nav>
                </div>
                
                {/* 标签云 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">热门标签</h2>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'Python', 'Docker', 'Kubernetes'].map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full hover:bg-blue-200 cursor-pointer transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* 最新文章 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">最新文章</h2>
                  <div className="space-y-3">
                    <a href="#" className="block hover:text-blue-600 transition-colors">
                      <div className="text-sm text-gray-900 line-clamp-2">React 18 新特性详解</div>
                      <div className="text-xs text-gray-500 mt-1">2024-01-15</div>
                    </a>
                    <a href="#" className="block hover:text-blue-600 transition-colors">
                      <div className="text-sm text-gray-900 line-clamp-2">Next.js 14 性能优化实践</div>
                      <div className="text-xs text-gray-500 mt-1">2024-01-10</div>
                    </a>
                    <a href="#" className="block hover:text-blue-600 transition-colors">
                      <div className="text-sm text-gray-900 line-clamp-2">TypeScript 5.0 新特性</div>
                      <div className="text-xs text-gray-500 mt-1">2024-01-05</div>
                    </a>
                  </div>
                </div>
              </aside>
              
              {/* 中间内容区域 */}
              <main className="lg:col-span-6">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  {children}
                </div>
              </main>
              
              {/* 右侧边栏 */}
              <aside className="lg:col-span-3">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">目录</h2>
                  <nav className="space-y-2 text-sm">
                    <a href="#section1" className="block text-gray-700 hover:text-blue-600 transition-colors">
                      快速开始
                    </a>
                    <a href="#section2" className="block text-gray-700 hover:text-blue-600 transition-colors pl-4">
                      安装配置
                    </a>
                    <a href="#section3" className="block text-gray-700 hover:text-blue-600 transition-colors pl-4">
                      基础使用
                    </a>
                    <a href="#section4" className="block text-gray-700 hover:text-blue-600 transition-colors">
                      高级功能
                    </a>
                    <a href="#section5" className="block text-gray-700 hover:text-blue-600 transition-colors pl-4">
                      性能优化
                    </a>
                  </nav>
                </div>
                
                {/* 相关文章 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">相关文章</h2>
                  <div className="space-y-3">
                    <a href="#" className="block hover:text-blue-600 transition-colors">
                      <div className="text-sm text-gray-900 line-clamp-2">深入理解 React Hooks</div>
                    </a>
                    <a href="#" className="block hover:text-blue-600 transition-colors">
                      <div className="text-sm text-gray-900 line-clamp-2">现代 CSS 布局技巧</div>
                    </a>
                    <a href="#" className="block hover:text-blue-600 transition-colors">
                      <div className="text-sm text-gray-900 line-clamp-2">JavaScript 性能优化</div>
                    </a>
                  </div>
                </div>
                
                {/* 社交链接 */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">关注我们</h2>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.22.082.34-.09.378-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.749-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017 0z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
} 