'use client'

import type { Dispatch, SetStateAction } from 'react'

interface ScrollRigProps {
  progress: number
  setProgress: Dispatch<SetStateAction<number>>
  focusedTitle: string | null
  onInspectFocused: () => void
}

export default function ScrollRig({ progress, setProgress, focusedTitle, onInspectFocused }: ScrollRigProps) {
  return (
    <div
      className="code-scrollRig"
      onClick={(event) => {
        const target = event.target as HTMLElement
        if (target.closest('.code-scrollRig__hud')) return
        onInspectFocused()
      }}
      onScroll={(event) => {
        const target = event.currentTarget
        const next =
          target.scrollHeight <= target.clientHeight
            ? 0
            : target.scrollTop / (target.scrollHeight - target.clientHeight)
        setProgress(next)
      }}
    >
      <div className="code-scrollRig__sticky">
        <div className="code-scrollRig__hud">
          <p className="code-scrollRig__eyebrow">OWAH.WORLD / CODE</p>
          <h1>Code world.</h1>
          <p>
            Scroll through the crystalline path. Pillars are interactive project artifacts with modal
            inspection and dimensional route transitions.
          </p>
          <div className="code-scrollRig__meter" aria-hidden="true">
            <span style={{ transform: `scaleX(${Math.min(Math.max(progress, 0), 1)})` }} />
          </div>
          <div className="code-scrollRig__scrollHint" aria-label="Scroll to explore code world">
            <div className="code-scrollRig__hintTop">
              <span>Scroll to explore</span>
              <span>{Math.round(progress * 100)}%</span>
            </div>
            <div className="code-scrollRig__hintTrack" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </div>
            <p className="code-scrollRig__focusReadout">
              Focus: <strong>{focusedTitle ?? 'OWAHWORLD'}</strong>
            </p>
            <p className="code-scrollRig__inspectHint">Click world to inspect focused project</p>
          </div>
        </div>
      </div>
      <div className="code-scrollRig__spacer" />

      <style jsx>{`
        .code-scrollRig {
          position: absolute;
          inset: 0;
          overflow-y: auto;
          overflow-x: hidden;
          z-index: 2;
        }

        .code-scrollRig__sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          pointer-events: none;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          padding: 112px 24px 136px;
        }

        .code-scrollRig__hud {
          width: min(390px, calc(100vw - 48px));
          padding: 18px 18px 20px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 18px;
          background: rgba(5, 10, 18, 0.28);
          backdrop-filter: blur(12px);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.24);
        }

        .code-scrollRig__eyebrow {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #8fdcff;
        }

        .code-scrollRig__hud h1 {
          margin-top: 12px;
          font-family: var(--font-title);
          font-size: clamp(2rem, 4vw, 3.2rem);
          line-height: 0.96;
          text-transform: uppercase;
          color: #f4fbff;
        }

        .code-scrollRig__hud p {
          margin-top: 12px;
          color: rgba(224, 240, 255, 0.76);
          max-width: 34ch;
        }

        .code-scrollRig__meter {
          margin-top: 16px;
          height: 2px;
          width: 100%;
          background: rgba(255, 255, 255, 0.12);
          overflow: hidden;
          transform-origin: left;
        }

        .code-scrollRig__meter span {
          display: block;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, #eff8ff, #57c7ff, #c7d9ff);
          transform-origin: left;
        }

        .code-scrollRig__scrollHint {
          margin-top: 16px;
          padding: 14px 14px 12px;
          border-radius: 12px;
          border: 1px solid rgba(151, 214, 255, 0.22);
          background: linear-gradient(180deg, rgba(13, 25, 40, 0.52), rgba(8, 14, 24, 0.36));
          box-shadow:
            0 0 0 1px rgba(255, 255, 255, 0.03) inset,
            0 0 32px rgba(87, 199, 255, 0.12);
          animation: scrollHintPulse 3.2s ease-in-out infinite;
        }

        .code-scrollRig__hintTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(214, 239, 255, 0.94);
        }

        .code-scrollRig__hintTrack {
          margin-top: 10px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
        }

        .code-scrollRig__hintTrack i {
          display: block;
          height: 2px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.45), rgba(87, 199, 255, 0.85));
          transform-origin: left;
          animation: hintTick 1.8s ease-in-out infinite;
        }

        .code-scrollRig__hintTrack i:nth-child(2) {
          animation-delay: 140ms;
        }

        .code-scrollRig__hintTrack i:nth-child(3) {
          animation-delay: 280ms;
        }

        .code-scrollRig__hintTrack i:nth-child(4) {
          animation-delay: 420ms;
        }

        .code-scrollRig__focusReadout {
          margin-top: 10px;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(176, 212, 236, 0.82);
        }

        .code-scrollRig__focusReadout strong {
          color: #dff3ff;
          font-weight: 500;
        }

        .code-scrollRig__inspectHint {
          margin-top: 8px;
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(160, 204, 236, 0.74);
        }

        .code-scrollRig__spacer {
          height: 540vh;
        }

        @keyframes hintTick {
          0%,
          100% {
            opacity: 0.48;
            transform: scaleX(0.6);
          }
          50% {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        @keyframes scrollHintPulse {
          0%,
          100% {
            border-color: rgba(151, 214, 255, 0.18);
            box-shadow:
              0 0 0 1px rgba(255, 255, 255, 0.03) inset,
              0 0 22px rgba(87, 199, 255, 0.09);
          }
          50% {
            border-color: rgba(187, 224, 255, 0.32);
            box-shadow:
              0 0 0 1px rgba(255, 255, 255, 0.06) inset,
              0 0 38px rgba(87, 199, 255, 0.2);
          }
        }

        @media (max-width: 700px) {
          .code-scrollRig__sticky {
            padding: 96px 16px 128px;
          }

          .code-scrollRig__hud {
            width: min(100%, 340px);
          }

          .code-scrollRig__spacer {
            height: 500vh;
          }
        }
      `}</style>
    </div>
  )
}
