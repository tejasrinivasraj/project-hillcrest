import { useFetch } from '@hooks/useFetch'
import { getTeam } from '@services/productService'
import { Card } from '@components/Card'
import styles from './TeamPage.module.css'

export function TeamPage() {
  const { data: team, loading, error } = useFetch(getTeam)

  if (loading) {
    return (
      <div role="status" aria-label="Loading team" className={styles.loading}>
        <span className="spinner" />
        <p>Loading team...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div role="alert" className={styles.error}>
        <p>Something went wrong: {error}</p>
      </div>
    )
  }

  return (
    <section className={styles.team} aria-labelledby="team-heading">
      <h1 id="team-heading">Our Team</h1>
      <p className={styles.subtitle}>The people behind the vibe.</p>
      <div className={styles.grid}>
        {team?.map((member) => (
          <Card key={member.id} title={member.name}>
            <p className={styles.role}>{member.role}</p>
            <p>{member.description}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
