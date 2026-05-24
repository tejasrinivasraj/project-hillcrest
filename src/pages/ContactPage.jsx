import { useState } from 'react'
import { Button } from '@components/Button'
import styles from './ContactPage.module.css'

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  function handleChange(field) {
    return (e) => {
      setForm({ ...form, [field]: e.target.value })
      if (errors[field]) {
        setErrors({ ...errors, [field]: undefined })
      }
    }
  }

  if (submitted) {
    return (
      <section className={styles.contact} aria-labelledby="contact-heading">
        <h1 id="contact-heading">Contact Us</h1>
        <div className={styles.success} role="status">
          <h2>Thanks for reaching out! 🎉</h2>
          <p>We'll get back to you soon.</p>
          <Button
            label="Send another message"
            variant="secondary"
            onClick={() => {
              setSubmitted(false)
              setForm({ name: '', email: '', message: '' })
            }}
          />
        </div>
      </section>
    )
  }

  return (
    <section className={styles.contact} aria-labelledby="contact-heading">
      <h1 id="contact-heading">Contact Us</h1>
      <p className={styles.subtitle}>Got a question or idea? We'd love to hear from you.</p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={handleChange('name')}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span id="name-error" className={styles.error} role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className={styles.error} role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows="5"
            value={form.message}
            onChange={handleChange('message')}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span id="message-error" className={styles.error} role="alert">
              {errors.message}
            </span>
          )}
        </div>

        <Button label="Send Message" type="submit" size="lg" />
      </form>
    </section>
  )
}
