import './ScreenShell.css'

export default function Archive() {
  return (
    <section className="screen-shell">
      <div className="screen-header">
        <span className="screen-glyph">◬</span>
        <div className="screen-header-text">
          <h2 className="screen-title">ARCHIVE</h2>
          <p className="screen-subtitle">the memory system</p>
        </div>
        <span className="screen-status screen-status--loaded">LOADED</span>
      </div>
      <div className="screen-content">
        <div className="screen-module-placeholder">
          <div className="screen-placeholder-icon">◬</div>
          <p className="screen-placeholder-text">
            eras · memory fragments · emotional snapshots · photos · reflections · symbolic moments · visual archives
          </p>
          <span className="screen-placeholder-tag">SUBSYSTEM LOADING</span>
        </div>
      </div>
    </section>
  )
}
