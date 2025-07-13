'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  className?: string
}

export function CodeBlock({ 
  code, 
  language = 'javascript', 
  filename,
  showLineNumbers = false,
  className = ''
}: CodeBlockProps) {
  return (
    <div className={`code-block-wrapper ${className}`}>
      {filename && (
        <div className="code-block-header">
          <span className="code-block-filename">{filename}</span>
          <span className="code-block-language">{language}</span>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          background: '#1a202c',
          fontSize: '0.875rem',
          lineHeight: '1.7',
        }}
        codeTagProps={{
          style: {
            fontFamily: "'JetBrains Mono', 'Fira Code', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  )
}

// 工具函数：从markdown代码块中提取语言和代码
export function parseCodeBlock(codeBlockText: string): {
  language: string
  code: string
  filename?: string
} {
  const lines = codeBlockText.split('\n')
  const firstLine = lines[0] || ''
  
  // 提取语言 (```javascript 或 ```javascript:filename.js)
  const langMatch = firstLine.match(/^```(\w+)(?::(.+))?$/)
  const language = langMatch ? langMatch[1] : 'text'
  const filename = langMatch ? langMatch[2] : undefined
  
  // 移除第一行和最后一行的```
  const code = lines.slice(1, -1).join('\n')
  
  return { language, code, filename }
}

// 简单的代码块组件用于内联使用
export function SimpleCodeBlock({ 
  children, 
  language = 'javascript' 
}: { 
  children: string
  language?: string 
}) {
  return (
    <SyntaxHighlighter
      language={language}
      style={tomorrow}
      customStyle={{
        margin: '1rem 0',
        borderRadius: '0.5rem',
        background: '#1a202c',
        fontSize: '0.875rem',
        lineHeight: '1.7',
      }}
      codeTagProps={{
        style: {
          fontFamily: "'JetBrains Mono', 'Fira Code', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        }
      }}
    >
      {children}
    </SyntaxHighlighter>
  )
} 