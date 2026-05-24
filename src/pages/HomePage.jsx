import { Link } from 'react-router-dom'
import { Button } from '@components/Button'
import styles from './HomePage.module.css'

export function HomePage() {
  return (
    <section className={styles.hero} aria-labelledby="home-heading">
      <h1 id="home-heading" className={styles.title}>
        Project Hillcrest
      </h1>
      <p className={styles.tagline}>Vibe solutions for everyday life</p>
      <p className={styles.description}>
        We build AI-powered tools that fit naturally into your daily routine — 
        helping you write, plan, focus, and live better without the friction.
      </p>
      <div className={styles.actions}>
        <Link to="/products">
          <Button label="Explore Solutions" size="lg" />
        </Link>
        <Link to="/about">
          <Button label="Learn More" variant="secondary" size="lg" />
        </Link>
      </div>
    </section>
  )
}
