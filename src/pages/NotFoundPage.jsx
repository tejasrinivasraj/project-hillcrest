import { Link } from 'react-router-dom'
import { Button } from '@components/Button'
import styles from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <section className={styles.notFound} aria-labelledby="notfound-heading">
      <h1 id="notfound-heading">404</h1>
      <p className={styles.message}>
        Oops — this page doesn't exist. Let's get you back on track.
      </p>
      <Link to="/">
        <Button label="Back to Home" size="lg" />
      </Link>
    </section>
  )
}
