const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: '@mdx-js/react',
  },
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    domains: ['localhost', 'example.com'],
  },
  env: {
    CUSTOM_KEY: 'my-value',
  },
  // 启用 standalone 模式以支持 Docker 部署
  output: 'standalone',
}

module.exports = withMDX(nextConfig) 