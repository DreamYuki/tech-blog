// 博客文章类型
export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  tags: string[]
  category: string
  readTime: number
  featured: boolean
  published: boolean
  author: Author
  seo: SEO
  media?: Media
}

// 作者类型
export interface Author {
  name: string
  email: string
  avatar?: string
  bio?: string
  social?: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}

// SEO类型
export interface SEO {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
}

// 媒体类型
export interface Media {
  images?: string[]
  audio?: AudioFile[]
  videos?: VideoFile[]
}

// 音频文件类型
export interface AudioFile {
  url: string
  title: string
  duration?: number
  type: 'background' | 'inline'
}

// 视频文件类型
export interface VideoFile {
  url: string
  title: string
  duration?: number
  thumbnail?: string
  type: 'youtube' | 'vimeo' | 'direct'
}

// 评论类型（为未来扩展预留）
export interface Comment {
  id: string
  postSlug: string
  author: CommentAuthor
  content: string
  date: string
  parentId?: string
  replies?: Comment[]
  approved: boolean
}

// 评论作者类型
export interface CommentAuthor {
  name: string
  email: string
  avatar?: string
  website?: string
}

// 支付类型（为未来扩展预留）
export interface Payment {
  id: string
  userId: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  date: string
  description: string
}

// 用户类型（为未来扩展预留）
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'admin' | 'user'
  subscription?: Subscription
  createdAt: string
  updatedAt: string
}

// 订阅类型（为未来扩展预留）
export interface Subscription {
  id: string
  userId: string
  plan: 'free' | 'premium' | 'pro'
  status: 'active' | 'cancelled' | 'expired'
  startDate: string
  endDate?: string
}

// 导航菜单类型
export interface NavigationItem {
  label: string
  href: string
  icon?: string
  children?: NavigationItem[]
}

// 页面元数据类型
export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  author?: string
  publishedAt?: string
  modifiedAt?: string
  canonical?: string
  ogImage?: string
} 