const icons = {
  writer: (
    <path d="M20 4L4 20l2 6 6 2L28 12M20 4l8 8M20 4l4-2 6 6-2 4" strokeLinecap="round" strokeLinejoin="round" />
  ),
  scheduler: (
    <>
      <rect x="4" y="6" width="24" height="22" rx="3" />
      <path d="M4 12h24M10 4v4M22 4v4M9 17h2M15 17h2M21 17h2M9 22h2M15 22h2" strokeLinecap="round" />
    </>
  ),
  planner: (
    <>
      <path d="M4 4h24v24H4z" rx="3" />
      <path d="M9 12l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 20h14" strokeLinecap="round" />
    </>
  ),
  mood: (
    <>
      <circle cx="16" cy="16" r="12" />
      <path d="M10 18c1.5 2.5 4 4 6 4s4.5-1.5 6-4" strokeLinecap="round" />
      <circle cx="11" cy="13" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="21" cy="13" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  recipe: (
    <>
      <path d="M8 4v8c0 4 3 6 8 6s8-2 8-6V4" strokeLinecap="round" />
      <path d="M8 8h16" strokeLinecap="round" />
      <path d="M16 18v6M12 24h8" strokeLinecap="round" />
    </>
  ),
  focus: (
    <>
      <circle cx="16" cy="16" r="12" />
      <path d="M16 8v8l5 3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
}

export function ProductIcon({ name, size = 40, color = 'var(--color-primary)' }) {
  const icon = icons[name] || icons.focus

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      stroke={color}
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {icon}
    </svg>
  )
}
