'use client'

import { SimpleCodeBlock } from './CodeBlock'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // 简化的解析逻辑
  const parseContent = (text: string) => {
    const elements: JSX.Element[] = []
    let currentIndex = 0
    
    // 使用支持 Windows 换行符的正则表达式
    const codeBlockRegex = /```(\w+)?\r?\n([\s\S]*?)```/g
    const matches = Array.from(text.matchAll(codeBlockRegex))
    
    if (matches.length === 0) {
      // 没有代码块，直接处理所有内容
      return (
        <div dangerouslySetInnerHTML={{ __html: processNonCodeContent(text) }} />
      )
    }
    
    matches.forEach((match, index) => {
      // 添加代码块之前的内容
      if (match.index! > currentIndex) {
        const beforeContent = text.slice(currentIndex, match.index!)
        if (beforeContent.trim()) {
          elements.push(
            <div key={`before-${index}`} 
                 dangerouslySetInnerHTML={{ __html: processNonCodeContent(beforeContent) }} />
          )
        }
      }
      
      // 添加代码块
      const language = match[1] || 'text'
      const code = match[2].trim()
      
      elements.push(
        <div key={`code-${index}`} style={{ margin: '2rem 0' }}>
          <SimpleCodeBlock language={language}>
            {code}
          </SimpleCodeBlock>
        </div>
      )
      
      currentIndex = match.index! + match[0].length
    })
    
    // 添加最后剩余的内容
    if (currentIndex < text.length) {
      const remainingContent = text.slice(currentIndex)
      if (remainingContent.trim()) {
        elements.push(
          <div key="remaining" 
               dangerouslySetInnerHTML={{ __html: processNonCodeContent(remainingContent) }} />
        )
      }
    }
    
    return <>{elements}</>
  }

  return (
    <div className="blog-post prose prose-lg max-w-none">
      {parseContent(content)}
    </div>
  )
}

// 处理非代码块内容
function processNonCodeContent(content: string): string {
  return content
    // 处理标题
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mb-4 mt-8">$1</h1>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mb-3 mt-6">$1</h2>')
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mb-2 mt-4">$1</h3>')
    // 处理文本格式
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // 处理内联代码
    .replace(/`(.*?)`/g, '<code class="inline-code">$1</code>')
    // 处理引用块
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4 bg-gray-50 p-4 rounded-r-lg">$1</blockquote>')
    // 处理列表
    .replace(/^\- (.*$)/gm, '<li class="mb-2">$1</li>')
    .replace(/^(\d+)\. (.*$)/gm, '<li class="mb-2">$2</li>')
    // 处理链接
    .replace(/\[([^\]]*)\]\(([^\)]*)\)/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>')
    // 处理换行
    .replace(/\n\n/g, '</p><p class="mb-4">')
    .replace(/\n/g, '<br>')
    // 包装段落
    .replace(/^(?!<[h|l|b|p])/gm, '<p class="mb-4">')
    .replace(/$/gm, '</p>')
    // 清理多余的段落标签
    .replace(/<p class="mb-4"><\/p>/g, '')
    .replace(/<p class="mb-4">(<[h|l|b])/g, '$1')
    .replace(/(<\/[h|l|b].*?>)<\/p>/g, '$1')
} 