import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.brand}>Project Hillcrest</p>
        <p className={styles.tagline}>Vibe solutions for everyday life</p>
        <p className={styles.copyright}>
          © {new Date().getFullYear()} Project Hillcrest. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
