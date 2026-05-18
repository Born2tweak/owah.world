import { useState, useEffect } from 'react'
import './App.css'
import CoreOS from './screens/CoreOS'
import CurrentState from './screens/CurrentState'
import Archive from './screens/Archive'
import Systems from './screens/Systems'
import Expression from './screens/Expression'
import Patterns from './screens/Patterns'
import NavShell from './components/NavShell'
import SystemOverlay from './components/SystemOverlay'
import BootSequence from './components/BootSequence'

const SCREENS = {
  core: { component: CoreOS, label: 'CORE', glyph: '◉' },
  state: { component: CurrentState, label: 'STATE', glyph: '◈' },
  archive: { component: Archive, label: 'ARCHIVE', glyph: '◬' },
  systems: { component: Systems, label: 'SYSTEMS', glyph: '⬡' },
  expression: { component: Expression, label: 'EXPRESSION', glyph: '◎' },
  patterns: { component: Patterns, label: 'PATTERNS', glyph: '✦' },
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('core')
  const [isBooted, setIsBooted] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [systemTime, setSystemTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const navigateTo = (screen) => {
    if (screen === currentScreen || isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentScreen(screen)
      setIsTransitioning(false)
    }, 400)
  }

  const handleBootComplete = () => {
    setIsBooted(true)
  }

  if (!isBooted) {
    return <BootSequence onComplete={handleBootComplete} />
  }

  const ActiveScreen = SCREENS[currentScreen].component

  return (
    <div className="owah-os">
      <SystemOverlay systemTime={systemTime} currentScreen={currentScreen} />
      <NavShell
        screens={SCREENS}
        currentScreen={currentScreen}
        onNavigate={navigateTo}
      />
      <main className={`os-viewport ${isTransitioning ? 'transitioning' : 'active'}`}>
        <ActiveScreen onNavigate={navigateTo} />
      </main>
    </div>
  )
}

export default App
