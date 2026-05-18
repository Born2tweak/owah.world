import { useState, useEffect, useCallback } from 'react'
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
  core: { component: CoreOS, label: 'CORE', glyph: '◉', temp: 'ice' },
  state: { component: CurrentState, label: 'STATE', glyph: '◈', temp: 'live' },
  archive: { component: Archive, label: 'ARCHIVE', glyph: '◬', temp: 'amber' },
  systems: { component: Systems, label: 'SYSTEMS', glyph: '⬡', temp: 'chrome' },
  expression: { component: Expression, label: 'EXPRESSION', glyph: '◎', temp: 'thermal' },
  patterns: { component: Patterns, label: 'PATTERNS', glyph: '✦', temp: 'neural' },
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('core')
  const [isBooted, setIsBooted] = useState(false)
  const [transitionPhase, setTransitionPhase] = useState('idle') // idle | fracture | void | assemble
  const [systemTime, setSystemTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const navigateTo = useCallback((screen) => {
    if (screen === currentScreen || transitionPhase !== 'idle') return

    // Phase 1: Fracture current screen
    setTransitionPhase('fracture')

    // Phase 2: Brief void
    setTimeout(() => {
      setTransitionPhase('void')
    }, 200)

    // Phase 3: Switch screen + assemble
    setTimeout(() => {
      setCurrentScreen(screen)
      setTransitionPhase('assemble')
    }, 300)

    // Phase 4: Done
    setTimeout(() => {
      setTransitionPhase('idle')
    }, 800)
  }, [currentScreen, transitionPhase])

  const handleBootComplete = () => {
    setIsBooted(true)
  }

  if (!isBooted) {
    return <BootSequence onComplete={handleBootComplete} />
  }

  const ActiveScreen = SCREENS[currentScreen].component
  const screenTemp = SCREENS[currentScreen].temp

  return (
    <div className={`owah-os owah-temp--${screenTemp}`} data-screen={currentScreen}>
      <SystemOverlay
        systemTime={systemTime}
        currentScreen={currentScreen}
        screenTemp={screenTemp}
      />
      <NavShell
        screens={SCREENS}
        currentScreen={currentScreen}
        onNavigate={navigateTo}
      />
      <main className={`os-viewport os-viewport--${transitionPhase}`}>
        <ActiveScreen onNavigate={navigateTo} />
      </main>
    </div>
  )
}

export default App
