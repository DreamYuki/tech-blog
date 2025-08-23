import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.iconSection}>
          <div className={styles.iconWrapper}>
            <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className={styles.errorCode}>404</h1>
          <h2 className={styles.errorTitle}>页面未找到</h2>
          <p className={styles.errorMessage}>
            抱歉，您访问的页面不存在。可能是链接错误或页面已被移除。
          </p>
        </div>

        <div className={styles.actions}>
          <Link href="/" className={`${styles.button} ${styles.buttonPrimary}`}>
            返回首页
          </Link>
          <Link href="/posts" className={`${styles.button} ${styles.buttonSecondary}`}>
            浏览所有文章
          </Link>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            如果您认为这是一个错误，请
            <a href="mailto:blogger@example.com" className={styles.contactLink}>
              联系我们
            </a>
          </p>
        </div>
      </div>
    </div>
  )
} 