'use client'

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import type { Dispatch, SetStateAction } from 'react'

interface ScrollRigProps {
  progress: number
  setProgress: Dispatch<SetStateAction<number>>
  focusedTitle: string | null
  modalOpen: boolean
}

const KEY_STEP_SMALL = 0.03
const KEY_STEP_MEDIUM = 0.08

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 1)
}

export default function ScrollRig({ progress, setProgress, focusedTitle, modalOpen }: ScrollRigProps) {
  const railRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    function isEditableTarget(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) return false
      const tag = target.tagName.toLowerCase()
      return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable
    }

    function onWheel(event: WheelEvent) {
      if (modalOpen || isEditableTarget(event.target)) return
      event.preventDefault()
      const delta = event.deltaY * 0.0011
      setProgress((current) => clampProgress(current + delta))
    }

    function onKeyDown(event: KeyboardEvent) {
      if (modalOpen || isEditableTarget(event.target)) return

      let step = 0
      if (event.key === 'ArrowDown') step = KEY_STEP_SMALL
      if (event.key === 'ArrowUp') step = -KEY_STEP_SMALL
      if (event.key === 'PageDown' || event.key === ' ') step = KEY_STEP_MEDIUM
      if (event.key === 'PageUp') step = -KEY_STEP_MEDIUM
      if (event.key === 'Home') {
        event.preventDefault()
        setProgress(0)
        return
      }
      if (event.key === 'End') {
        event.preventDefault()
        setProgress(1)
        return
      }
      if (step === 0) return

      event.preventDefault()
      setProgress((current) => clampProgress(current + step))
    }

    // touch: vertical swipe anywhere scrubs the path (wheel/keys don't fire on touch).
    // Skip when the gesture starts on the drag rail so the two don't fight.
    let lastTouchY: number | null = null
    function onTouchStart(event: TouchEvent) {
      if (modalOpen) return
      const t = event.target
      if (t instanceof HTMLElement && t.closest('.code-scrollRig__rail')) {
        lastTouchY = null
        return
      }
      lastTouchY = event.touches[0]?.clientY ?? null
    }
    function onTouchMove(event: TouchEvent) {
      if (modalOpen || lastTouchY == null) return
      const y = event.touches[0]?.clientY ?? lastTouchY
      const dy = lastTouchY - y
      lastTouchY = y
      if (event.cancelable) event.preventDefault()
      setProgress((current) => clampProgress(current + dy * 0.0015))
    }
    function onTouchEnd() {
      lastTouchY = null
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [modalOpen, setProgress])

  function updateFromPointer(clientY: number) {
    const rail = railRef.current
    if (!rail) return
    const rect = rail.getBoundingClientRect()
    const ratio = (clientY - rect.top) / rect.height
    setProgress(clampProgress(ratio))
  }

  function onRailPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.preventDefault()
    setDragging(true)
    event.currentTarget.setPointerCapture(event.pointerId)
    updateFromPointer(event.clientY)
  }

  function onRailPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging) return
    event.preventDefault()
    updateFromPointer(event.clientY)
  }

  function onRailPointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    setDragging(false)
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <div className="code-scrollRig">
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
              <span>Scroll · swipe · drag</span>
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
          </div>
        </div>

        <div className="code-scrollRig__railWrap">
          <div
            ref={railRef}
            className={`code-scrollRig__rail${dragging ? ' is-dragging' : ''}`}
            role="slider"
            aria-label="Code world scroll position"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            tabIndex={0}
            onPointerDown={onRailPointerDown}
            onPointerMove={onRailPointerMove}
            onPointerUp={onRailPointerUp}
            onPointerCancel={() => setDragging(false)}
          >
            <span className="code-scrollRig__railTrack" />
            <span className="code-scrollRig__railThumb" style={{ top: `calc(${progress * 100}% - 14px)` }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .code-scrollRig {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        .code-scrollRig__sticky {
          position: absolute;
          inset: 0;
          height: 100vh;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
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
          pointer-events: auto;
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

        .code-scrollRig__railWrap {
          height: 100%;
          display: flex;
          align-items: center;
          pointer-events: none;
        }

        .code-scrollRig__rail {
          position: relative;
          width: 44px;
          height: min(62vh, 560px);
          border-radius: 999px;
          pointer-events: auto;
          cursor: grab;
          touch-action: none;
        }

        .code-scrollRig__rail.is-dragging {
          cursor: grabbing;
        }

        .code-scrollRig__railTrack {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 100%;
          border-radius: 999px;
          border: 1px solid rgba(178, 220, 255, 0.28);
          background: linear-gradient(180deg, rgba(12, 22, 34, 0.5), rgba(9, 15, 25, 0.32));
          box-shadow: 0 0 24px rgba(87, 199, 255, 0.16);
          transition: border-color 160ms ease, box-shadow 160ms ease;
        }

        .code-scrollRig__rail:hover .code-scrollRig__railTrack,
        .code-scrollRig__rail.is-dragging .code-scrollRig__railTrack {
          border-color: rgba(207, 233, 255, 0.46);
          box-shadow: 0 0 28px rgba(87, 199, 255, 0.26);
        }

        .code-scrollRig__railThumb {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 28px;
          border-radius: 999px;
          border: 1px solid rgba(208, 236, 255, 0.55);
          background:
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.86), rgba(143, 214, 255, 0.26) 58%),
            linear-gradient(180deg, rgba(15, 28, 42, 0.96), rgba(9, 16, 24, 0.78));
          box-shadow: 0 0 30px rgba(87, 199, 255, 0.34);
          transition: transform 120ms ease, box-shadow 120ms ease;
        }

        .code-scrollRig__rail:hover .code-scrollRig__railThumb,
        .code-scrollRig__rail.is-dragging .code-scrollRig__railThumb {
          transform: translateX(-50%) scale(1.06);
          box-shadow: 0 0 38px rgba(87, 199, 255, 0.45);
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
            padding: 84px 14px 118px;
          }

          .code-scrollRig__hud {
            width: min(100%, 320px);
            padding: 14px 15px 15px;
          }

          .code-scrollRig__hud h1 {
            font-size: 1.7rem;
            margin-top: 8px;
          }

          /* trim the long description on phones — keep title + meter + hint */
          .code-scrollRig__hud > p {
            display: none;
          }

          .code-scrollRig__meter {
            margin-top: 12px;
          }

          .code-scrollRig__scrollHint {
            margin-top: 12px;
            padding: 10px 12px 10px;
          }

          .code-scrollRig__rail {
            width: 40px;
            height: 52vh;
          }
        }
      `}</style>
    </div>
  )
}
