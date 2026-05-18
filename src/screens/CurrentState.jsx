import './ScreenShell.css'

export default function CurrentState() {
  return (
    <section className="screen-shell">
      <div className="screen-header">
        <span className="screen-glyph">◈</span>
        <div className="screen-header-text">
          <h2 className="screen-title">CURRENT STATE</h2>
          <p className="screen-subtitle">the live nervous system</p>
        </div>
        <span className="screen-status screen-status--live">LIVE</span>
      </div>
      <div className="screen-content">
        <div className="screen-module-placeholder">
          <div className="screen-placeholder-icon">◈</div>
          <p className="screen-placeholder-text">
            current obsessions · music · thoughts · projects · inspirations · training · emotional states
          </p>
          <span className="screen-placeholder-tag">SUBSYSTEM LOADING</span>
        </div>
      </div>
    </section>
  )
}
