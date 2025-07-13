import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost } from '@/types'
import { calculateReadTime } from '@/lib/utils'

const postsDirectory = path.join(process.cwd(), 'content/posts')

// 获取所有博客文章
export async function getAllPosts(): Promise<BlogPost[]> {
  // 如果posts目录不存在，返回示例数据
  if (!fs.existsSync(postsDirectory)) {
    return getMockPosts()
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx?$/, '')
        return await getPostBySlug(slug)
      })
  )

  return allPostsData
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// 根据slug获取单个文章
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const mdxPath = path.join(postsDirectory, `${slug}.mdx`)
  
  let filePath = fullPath
  if (!fs.existsSync(fullPath) && fs.existsSync(mdxPath)) {
    filePath = mdxPath
  }

  // 如果文件不存在，返回示例文章
  if (!fs.existsSync(filePath)) {
    return getMockPost(slug)
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || '未命名文章',
    excerpt: data.excerpt || content.substring(0, 200) + '...',
    content,
    date: data.date || new Date().toISOString(),
    tags: data.tags || [],
    category: data.category || '未分类',
    readTime: data.readTime || calculateReadTime(content),
    featured: data.featured || false,
    published: data.published !== false,
    author: data.author || {
      name: '技术博主',
      email: 'blogger@example.com',
      avatar: '/images/avatar.jpg'
    },
    seo: {
      title: data.seo?.title || data.title,
      description: data.seo?.description || data.excerpt,
      keywords: data.seo?.keywords || data.tags || [],
      ogImage: data.seo?.ogImage || '/images/og-default.jpg'
    },
    media: data.media
  }
}

// 获取文章分类
export async function getCategories(): Promise<string[]> {
  const posts = await getAllPosts()
  const categories = [...new Set(posts.map(post => post.category))]
  return categories.sort()
}

// 获取标签
export async function getTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = [...new Set(posts.flatMap(post => post.tags))]
  return tags.sort()
}

// 根据分类获取文章
export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.category === category)
}

// 根据标签获取文章
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.tags.includes(tag))
}

// 获取精选文章
export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.featured)
}

// 搜索文章
export async function searchPosts(query: string): Promise<BlogPost[]> {
  const posts = await getAllPosts()
  const searchTerm = query.toLowerCase()
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

// 获取示例文章数据（用于演示）
function getMockPosts(): BlogPost[] {
  return [
    {
      slug: 'react-hooks-guide',
      title: 'React Hooks 完全指南',
      excerpt: '深入理解React Hooks的使用方法和最佳实践，包括useState、useEffect、useContext等核心Hooks的详细讲解。',
      content: `# React Hooks 完全指南

React Hooks 是 React 16.8 引入的新特性，它让你可以在不编写 class 组件的情况下使用 state 和其他 React 特性。

## useState Hook

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

useEffect Hook 可以让你在函数组件中执行副作用操作。

\`\`\`javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`你点击了 \${count} 次\`;
  });

  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}
\`\`\`

这只是 React Hooks 的开始，还有更多强大的功能等待你去探索！`,
      date: '2024-01-15',
      tags: ['React', 'JavaScript', '前端开发'],
      category: '前端开发',
      readTime: 8,
      featured: true,
      published: true,
      author: {
        name: '技术博主',
        email: 'blogger@example.com',
        avatar: '/images/avatar.jpg'
      },
      seo: {
        title: 'React Hooks 完全指南 - 技术博客',
        description: '深入理解React Hooks的使用方法和最佳实践',
        keywords: ['React', 'Hooks', 'JavaScript', '前端'],
        ogImage: '/images/react-hooks-og.jpg'
      },
      media: {
        images: ['/images/react-hooks-1.jpg', '/images/react-hooks-2.jpg'],
        audio: [{
          url: '/audio/react-hooks-explanation.mp3',
          title: 'React Hooks 语音解释',
          type: 'inline'
        }]
      }
    },
    {
      slug: 'nextjs-performance-optimization',
      title: 'Next.js 性能优化最佳实践',
      excerpt: '学习如何优化Next.js应用的性能，包括代码分割、图片优化、SEO优化等实用技巧。',
      content: `# Next.js 性能优化最佳实践

Next.js 是一个强大的 React 框架，本文将介绍如何优化 Next.js 应用的性能。

## 1. 代码分割

Next.js 自动进行代码分割，但你也可以手动优化：

\`\`\`javascript
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(() => import('../components/heavy-component'), {
  loading: () => <p>加载中...</p>,
});
\`\`\`

## 2. 图片优化

使用 Next.js 的 Image 组件：

\`\`\`javascript
import Image from 'next/image';

function MyImage() {
  return (
    <Image
      src="/images/my-image.jpg"
      alt="描述"
      width={500}
      height={300}
      priority
    />
  );
}
\`\`\`

## 3. 字体优化

使用 next/font 优化字体加载：

\`\`\`javascript
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
\`\`\`

通过这些优化技巧，你的 Next.js 应用将获得更好的性能表现！`,
      date: '2024-01-10',
      tags: ['Next.js', 'React', '性能优化', 'SEO'],
      category: '前端开发',
      readTime: 12,
      featured: true,
      published: true,
      author: {
        name: '技术博主',
        email: 'blogger@example.com',
        avatar: '/images/avatar.jpg'
      },
      seo: {
        title: 'Next.js 性能优化最佳实践 - 技术博客',
        description: '学习如何优化Next.js应用的性能',
        keywords: ['Next.js', '性能优化', 'React', '前端'],
        ogImage: '/images/nextjs-performance-og.jpg'
      },
      media: {
        videos: [{
          url: 'https://www.youtube.com/watch?v=example',
          title: 'Next.js 性能优化演示',
          type: 'youtube',
          thumbnail: '/images/nextjs-video-thumb.jpg'
        }]
      }
    },
    {
      slug: 'typescript-advanced-types',
      title: 'TypeScript 高级类型详解',
      excerpt: '深入探讨TypeScript的高级类型系统，包括泛型、条件类型、映射类型等复杂概念。',
      content: `# TypeScript 高级类型详解

TypeScript 的类型系统非常强大，本文将深入探讨一些高级类型特性。

## 1. 泛型

泛型允许我们创建可重用的组件：

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
let output2 = identity<number>(100);
\`\`\`

## 2. 条件类型

条件类型基于条件表达式选择类型：

\`\`\`typescript
type IsArray<T> = T extends any[] ? true : false;

type A = IsArray<string[]>; // true
type B = IsArray<string>;   // false
\`\`\`

## 3. 映射类型

映射类型可以基于现有类型创建新类型：

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyUser = Readonly<{ name: string; age: number }>;
\`\`\`

## 4. 实用类型

TypeScript 提供了许多实用类型：

\`\`\`typescript
// Pick - 选择属性
type UserName = Pick<User, 'name'>;

// Omit - 省略属性
type UserWithoutId = Omit<User, 'id'>;

// Partial - 可选属性
type PartialUser = Partial<User>;
\`\`\`

掌握这些高级类型将让你的 TypeScript 代码更加类型安全和灵活！`,
      date: '2024-01-05',
      tags: ['TypeScript', 'JavaScript', '类型系统'],
      category: '前端开发',
      readTime: 15,
      featured: false,
      published: true,
      author: {
        name: '技术博主',
        email: 'blogger@example.com',
        avatar: '/images/avatar.jpg'
      },
      seo: {
        title: 'TypeScript 高级类型详解 - 技术博客',
        description: '深入探讨TypeScript的高级类型系统',
        keywords: ['TypeScript', '高级类型', '泛型', '条件类型'],
        ogImage: '/images/typescript-types-og.jpg'
      }
    }
  ]
}

// 获取示例单个文章
function getMockPost(slug: string): BlogPost {
  const mockPosts = getMockPosts()
  return mockPosts.find(post => post.slug === slug) || mockPosts[0]
} 