import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import styles from './page.module.css'

const fallbackCovers = [
  '/images/open_laptop_on_desk_with_floating_code_snippets_a_64a7a510-c3ee-441e-9f0c-d581584f084e.png',
  '/images/open_notebook_with_pen_digital_holographic_code_f_3e70a5e3-d5c7-42b0-abc0-b6963766cca7.png',
  '/images/colorful_web_browser_window_with_semantic_html_ta_34b737e2-1b77-481d-99c8-8e0a0f0231e3.png',
  '/images/abstract_backend_server_diagram_glowing_in_futuri_a268425e-28f7-4de4-9d78-9e00ea800aa2.png',
  '/images/neural_network_glowing_connections_embedding_vect_5887ab88-2353-434f-a1ba-8bb95916f6f4.png',
  '/images/Prompt_flowing_coroutine_streams_as_luminous_thre_f673936b-e160-4989-8ed0-7ae86cded15b.png',
]

function pickCover(post: any, idx: number) {
  const img = post?.media?.images?.[0]
  if (img) return img
  return fallbackCovers[idx % fallbackCovers.length]
}

export default async function Home() {
  const posts = await getAllPosts()
  const featuredPosts = posts.filter(post => post.featured)
  const recentPosts = posts.slice(0, 12)

  return (
    <>
      <div className={styles.breadcrumb}>
        <nav className={styles.breadcrumbNav}>
          <span className={styles.breadcrumbCurrent}>首页</span>
        </nav>
      </div>

      <div className={styles.pageContent}>
        {featuredPosts.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>特色文章</h2>
            <div className={styles.masonry}>
              {featuredPosts.map((post, i) => (
                <article key={post.slug} className={styles.cardM}>
                  <Link href={`/posts/${post.slug}`}>
                    <img className={styles.cover} src={pickCover(post, i)} alt={post.title} />
                  </Link>
                  <div className={styles.body}>
                    <h3 className={styles.titleM}>
                      <Link href={`/posts/${post.slug}`} className={styles.postLink}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className={styles.subtitle}>{post.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>最新文章</h2>
            <Link href="/posts" className={styles.viewAllLink}>查看全部 →</Link>
          </div>
          <div className={styles.masonry}>
            {recentPosts.map((post, i) => (
              <article key={post.slug} className={styles.cardM}>
                <Link href={`/posts/${post.slug}`}>
                  <img className={styles.cover} src={pickCover(post, i)} alt={post.title} />
                </Link>
                <div className={styles.body}>
                  <h3 className={styles.titleM}>
                    <Link href={`/posts/${post.slug}`} className={styles.postLink}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className={styles.subtitle}>{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  )
} 