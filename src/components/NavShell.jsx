import { useState } from 'react'
import './NavShell.css'

export default function NavShell({ screens, currentScreen, onNavigate }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <nav
      className={`nav-shell ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="nav-rail">
        {Object.entries(screens).map(([key, screen]) => (
          <button
            key={key}
            className={`nav-node ${currentScreen === key ? 'active' : ''}`}
            onClick={() => onNavigate(key)}
            aria-label={screen.label}
            id={`nav-${key}`}
          >
            <span className="nav-glyph">{screen.glyph}</span>
            <span className="nav-label">{screen.label}</span>
            {currentScreen === key && <span className="nav-active-dot" />}
          </button>
        ))}
      </div>
      <div className="nav-signal-line" />
    </nav>
  )
}
