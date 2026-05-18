import './ScreenShell.css'

export default function Expression() {
  return (
    <section className="screen-shell">
      <div className="screen-header">
        <span className="screen-glyph">◎</span>
        <div className="screen-header-text">
          <h2 className="screen-title">EXPRESSION</h2>
          <p className="screen-subtitle">the aura layer</p>
        </div>
        <span className="screen-status screen-status--active">ACTIVE</span>
      </div>
      <div className="screen-content">
        <div className="screen-module-placeholder">
          <div className="screen-placeholder-icon">◎</div>
          <p className="screen-placeholder-text">
            biomechanics · movement clips · playlists · edits · fashion · visual inspiration · rhythm systems
          </p>
          <span className="screen-placeholder-tag">SUBSYSTEM LOADING</span>
        </div>
      </div>
    </section>
  )
}
