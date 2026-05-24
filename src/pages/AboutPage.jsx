import styles from './AboutPage.module.css'

export function AboutPage() {
  return (
    <section className={styles.about} aria-labelledby="about-heading">
      <h1 id="about-heading">About Project Hillcrest</h1>

      <div className={styles.content}>
        <div className={styles.block}>
          <h2>Our Mission</h2>
          <p>
            We believe technology should feel like a natural extension of your life — 
            not another thing to manage. Project Hillcrest builds AI solutions that 
            understand how you live and adapt to make your days smoother, more 
            productive, and more enjoyable.
          </p>
        </div>

        <div className={styles.block}>
          <h2>Our Vision</h2>
          <p>
            A world where AI doesn't replace human connection — it enhances it. 
            Where smart tools handle the mundane so you can focus on what matters. 
            We're building that future, one vibe at a time.
          </p>
        </div>

        <div className={styles.block}>
          <h2>Why "Hillcrest"?</h2>
          <p>
            A hillcrest is the highest point — the place with the clearest view. 
            That's what we aim to give you: clarity in a noisy world, powered by 
            AI that actually gets you.
          </p>
        </div>
      </div>
    </section>
  )
}
