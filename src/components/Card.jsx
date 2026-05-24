import styles from './Card.module.css'

export function Card({ title, children, className = '', onClick }) {
  const Component = onClick ? 'button' : 'div'

  return (
    <Component
      className={`${styles.card} ${className}`}
      onClick={onClick}
      {...(onClick && { type: 'button' })}
    >
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.body}>{children}</div>
    </Component>
  )
}
