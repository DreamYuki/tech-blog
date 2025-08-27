import styles from './page.module.css'

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>关于本站</h1>
      <p className={styles.text}>这是一个使用 Next.js + CSS Modules 搭建的技术博客，记录从炼气期到元婴期的修炼之路。</p>
      <p className={styles.text}>背景音乐全站持续播放，分类与文章页均做了无刷新路由处理。</p>
    </div>
  )
}
