import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const audioDir = path.join(process.cwd(), 'public', 'audio')
    
    // 检查目录是否存在
    if (!fs.existsSync(audioDir)) {
      return NextResponse.json({ tracks: [] })
    }

    // 读取目录中的所有文件
    const files = fs.readdirSync(audioDir)
    
    // 过滤音频文件
    const audioExtensions = ['.mp3', '.wav', '.ogg', '.m4a', '.aac']
    const audioFiles = files.filter(file => 
      audioExtensions.some(ext => file.toLowerCase().endsWith(ext))
    )

    // 构建音频文件信息
    const tracks = audioFiles.map(file => {
      const filePath = path.join(audioDir, file)
      const stats = fs.statSync(filePath)
      const name = path.parse(file).name
      
      return {
        id: file,
        title: name.replace(/[-_]/g, ' '), // 将文件名中的横线和下划线替换为空格
        url: `/audio/${file}`,
        size: stats.size,
        modified: stats.mtime.toISOString()
      }
    })

    // 按修改时间排序（最新的在前）
    tracks.sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime())

    return NextResponse.json({ tracks })
  } catch (error) {
    console.error('Error reading audio directory:', error)
    return NextResponse.json({ tracks: [] })
  }
}
