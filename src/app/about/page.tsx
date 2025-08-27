import styles from './page.module.css'

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>关于我</h1>

      <div className={styles.card}>
        <p className={styles.text}>你好，我是Manuel Huang，1998 年生，毕业于中南大学（2017–2021）。</p>
        <p className={styles.text}>我喜欢把技术当作长期习惯来打理。</p>
        <p className={styles.text}>写代码，做产品，复盘问题，记录过程。</p>
      </div>

      <h2 className={styles.title + ' ' + styles.section} style={{ fontSize: 20 }}>个人标签</h2>
      <div className={styles.card}>
        <p className={styles.text}>系统设计 / 前后端协作 / 工程效率 / 可落地的产品思维。</p>
        <p className={styles.text}>遇到复杂问题，先把它拆小，再把每一小步走稳。</p>
      </div>

      <h2 className={styles.title + ' ' + styles.section} style={{ fontSize: 20 }}>时间线（节选）</h2>
      <div className={styles.timeline}>
        <div className={styles.item}>
          <div className={styles.card}>
            <p className={styles.text}><strong>2024.11 – 至今｜携程集团</strong></p>
            <p className={styles.text}>在业务中推进 AI 能力落地。</p>
            <p className={styles.text}>从 0 到 1 搭过自动化平台与多模型调度。</p>
            <p className={styles.text}>也写常规聚合服务与业务需求，注重稳定可维护。</p>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.card}>
            <p className={styles.text}><strong>2023.01 – 2023.07｜Applovin（杭州）</strong></p>
            <p className={styles.text}>从 0 搭建内部运营平台。</p>
            <p className={styles.text}>实现分布式抓取与数据处理，长期稳定在线。</p>
            <p className={styles.text}>偶尔下沉到 Kotlin 服务端做联动。</p>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.card}>
            <p className={styles.text}><strong>2022｜自研量化交易系统</strong></p>
            <p className={styles.text}>实现策略、实时行情、回测与撮合。</p>
            <p className={styles.text}>更重视可靠、可复用与长期维护。</p>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.card}>
            <p className={styles.text}><strong>2021.07 – 2022.07｜腾讯（深圳）</strong></p>
            <p className={styles.text}>参与中台平台前端开发与迁移。</p>
            <p className={styles.text}>做过音视频相关工作，基于 Flutter 尝试 RTC 能力。</p>
          </div>
        </div>
      </div>

      <h2 className={styles.title + ' ' + styles.section} style={{ fontSize: 20 }}>正在做的事</h2>
      <div className={styles.card}>
        <p className={styles.text}>我在把前端经验延展到更完整的链路。</p>
        <p className={styles.text}>学习并实践后端工程与基础架构，补齐数据与部署能力。</p>
        <p className={styles.text}>系统化学习 AI（训练 / 推理 / 向量 / Agent），把小项目做成可复用的小工具。</p>
        <p className={styles.text}>同时，留意 AI 创业的更多可能性，观察真实场景与可落地的切入点。</p>
      </div>

      <h2 className={styles.title + ' ' + styles.section} style={{ fontSize: 20 }}>为什么写这个博客</h2>
      <div className={styles.card}>
        <p className={styles.text}>信息很多，记忆很短。</p>
        <p className={styles.text}>这里是一个安静的地方，用来放下我走过的路：代码的来龙去脉、线上问题的处理、产品取舍，以及生活里的些许感受。</p>
        <p className={styles.text}>写下来，是为了以后还能看见自己曾怎么想、怎么做。</p>
      </div>

      <h2 className={styles.title + ' ' + styles.section} style={{ fontSize: 20 }}>About Me（EN）</h2>
      <div className={styles.card}>
        <p className={styles.text}>Hi, I’m Manuel. CS graduate from CSU.</p>
        <p className={styles.text}>I build things end‑to‑end, care about clarity and reliability.</p>
        <p className={styles.text}>Recently learning backend and AI (training/inference/agents) to become a well‑rounded engineer.</p>
      </div>
    </div>
  )
}
