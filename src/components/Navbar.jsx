import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Logo } from '@components/Logo'
import styles from './Navbar.module.css'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Team', path: '/team' },
  { label: 'Contact', path: '/contact' },
]

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <Logo size={32} />
          <span>Project Hillcrest</span>
        </NavLink>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <span className={styles.hamburger} />
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.open : ''}`}>
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
