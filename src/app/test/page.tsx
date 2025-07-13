'use client'

import { SimpleCodeBlock } from '@/components/CodeBlock'

export default function TestPage() {
  const jsCode = `// JavaScript 示例
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 输出: 55`

  const pythonCode = `# Python 示例
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

print(quick_sort([3, 6, 8, 10, 1, 2, 1]))`

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">代码高亮测试页面</h1>
        
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">JavaScript 代码块</h2>
          <SimpleCodeBlock language="javascript">
            {jsCode}
          </SimpleCodeBlock>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">Python 代码块</h2>
          <SimpleCodeBlock language="python">
            {pythonCode}
          </SimpleCodeBlock>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold mb-4">CSS 代码块</h2>
          <SimpleCodeBlock language="css">
{`/* CSS 示例 */
.blog-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

.blog-post h1 {
  color: #1a202c;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}`}
          </SimpleCodeBlock>
        </div>
      </div>
    </div>
  )
} 