import './ScreenShell.css'

export default function Systems() {
  return (
    <section className="screen-shell">
      <div className="screen-header">
        <span className="screen-glyph">⬡</span>
        <div className="screen-header-text">
          <h2 className="screen-title">SYSTEMS</h2>
          <p className="screen-subtitle">the engineering layer</p>
        </div>
        <span className="screen-status screen-status--active">ACTIVE</span>
      </div>
      <div className="screen-content">
        <div className="screen-module-placeholder">
          <div className="screen-placeholder-icon">⬡</div>
          <p className="screen-placeholder-text">
            system diagrams · architecture visualizations · interactive project worlds · code fragments · engineering experiments
          </p>
          <span className="screen-placeholder-tag">SUBSYSTEM LOADING</span>
        </div>
      </div>
    </section>
  )
}
