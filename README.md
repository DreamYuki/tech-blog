# 技术博客

一个现代化的个人技术博客项目，支持富文本文章、代码块、音频播放和视频播放功能。

## 特性

- ✅ **富文本支持** - 使用 MDX 支持 Markdown 和 React 组件
- ✅ **代码高亮** - 使用 Prism.js 提供代码语法高亮
- ✅ **音频播放** - 支持背景音乐和内嵌音频播放器
- ✅ **视频播放** - 支持 YouTube、Vimeo 等视频平台
- ✅ **响应式设计** - 完美适配桌面和移动设备
- ✅ **SEO优化** - 内置 SEO 最佳实践
- ✅ **现代化UI** - 使用 Tailwind CSS 和 Headless UI
- 🔄 **评论系统** - 预留评论功能接口
- 🔄 **支付系统** - 预留付费内容接口

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **内容**: MDX (Markdown + React)
- **UI组件**: Headless UI + Lucide React
- **音频/视频**: React Player + 自定义播放器
- **部署**: Vercel (推荐)

## 项目结构

```
tech-blog/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── layout.tsx          # 根布局
│   │   ├── page.tsx            # 首页
│   │   └── globals.css         # 全局样式
│   ├── components/             # React 组件
│   │   ├── ui/                 # 基础 UI 组件
│   │   ├── AudioPlayer.tsx     # 音频播放器
│   │   ├── VideoPlayer.tsx     # 视频播放器
│   │   └── BackgroundAudioPlayer.tsx  # 背景音乐播放器
│   ├── lib/                    # 工具函数
│   │   ├── utils.ts            # 通用工具
│   │   └── posts.ts            # 文章处理
│   ├── types/                  # TypeScript 类型定义
│   │   └── index.ts
│   └── hooks/                  # 自定义 React Hooks
├── content/                    # 博客内容
│   └── posts/                  # 文章 (.md/.mdx)
├── public/                     # 静态资源
│   ├── images/                 # 图片
│   ├── audio/                  # 音频文件
│   └── video/                  # 视频文件
├── next.config.js              # Next.js 配置
├── tailwind.config.js          # Tailwind CSS 配置
└── package.json                # 依赖管理
```

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 3. 创建博客文章

在 `content/posts/` 目录下创建 `.md` 或 `.mdx` 文件：

```markdown
---
title: "我的第一篇博客"
excerpt: "这是一篇示例博客文章"
date: "2024-01-01"
tags: ["技术", "博客"]
category: "技术分享"
published: true
---

# 我的第一篇博客

这是文章内容...

## 代码示例

```javascript
console.log("Hello World!")
```

## 音频播放

<AudioPlayer audio={{
  url: "/audio/example.mp3",
  title: "示例音频",
  type: "inline"
}} />

## 视频播放

<VideoPlayer video={{
  url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  title: "示例视频",
  type: "youtube"
}} />
```

### 4. 构建生产版本

```bash
npm run build
npm run start
```

## 自定义配置

### 音频播放器

在文章中使用音频播放器：

```jsx
<AudioPlayer 
  audio={{
    url: "/audio/background-music.mp3",
    title: "背景音乐",
    type: "inline"
  }}
  autoPlay={false}
  showControls={true}
/>
```

### 视频播放器

在文章中使用视频播放器：

```jsx
<VideoPlayer 
  video={{
    url: "https://www.youtube.com/watch?v=VIDEO_ID",
    title: "技术教程",
    type: "youtube"
  }}
  autoPlay={false}
  showControls={true}
/>
```

### 背景音乐

背景音乐播放器会在每个页面的右下角显示，用户可以控制播放/暂停。

## 部署

### Vercel 部署

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 上导入项目
3. 配置环境变量（如果需要）
4. 点击部署

### 其他平台

项目是标准的 Next.js 应用，可以部署到任何支持 Node.js 的平台。

## 扩展功能

### 评论系统

项目预留了评论系统的接口，可以轻松集成：

- Disqus
- Gitalk
- Utterances
- 自定义评论系统

### 支付系统

项目预留了支付系统的接口，可以集成：

- Stripe
- PayPal
- 微信支付
- 支付宝

### 用户认证

可以集成认证系统：

- NextAuth.js
- Auth0
- Firebase Auth
- Supabase Auth

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License

## 作者

技术博主 - [你的邮箱](mailto:your@email.com)

## 支持

如果这个项目对你有帮助，请给它一个 ⭐️！ 