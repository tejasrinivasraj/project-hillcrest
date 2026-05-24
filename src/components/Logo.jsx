import styles from './Logo.module.css'

export function Logo({ size = 32 }) {
  return (
    <svg
      className={styles.logo}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hillcrest mountain shape */}
      <path
        d="M24 6L4 38h40L24 6z"
        fill="var(--color-primary)"
        opacity="0.9"
      />
      <path
        d="M24 6L14 26h20L24 6z"
        fill="var(--color-primary-dark)"
        opacity="0.7"
      />
      {/* Sun/circle at the peak */}
      <circle cx="24" cy="12" r="4" fill="var(--color-accent)" />
    </svg>
  )
}
