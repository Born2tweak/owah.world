'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { CodeProject } from '@/data/projects'
import styles from './ProjectModal.module.css'

interface ProjectModalProps {
  project: CodeProject
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeButtonRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const statusLabel = project.status.replace('_', ' ').toUpperCase()
  const accentStyle = { ['--accent' as string]: project.accent }

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <section
        className={styles.modal}
        style={accentStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div>
            <p className={styles.eyebrow}>
              {statusLabel} / {project.type}
            </p>
            <h2 id="project-modal-title" className={styles.title}>
              {project.title}
            </h2>
            <p className={styles.tagline}>{project.tagline}</p>
          </div>
          <button ref={closeButtonRef} type="button" className={styles.close} onClick={onClose}>
            Close
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.preview}>
            <span className={styles.previewLabel}>Project preview</span>
            <p className={styles.previewTitle}>
              {project.previewImage ? `${project.title} environment capture` : `${project.title} placeholder preview`}
            </p>
            {project.previewImage ? (
              <div className={styles.previewImageWrap}>
                <Image src={project.previewImage} alt={`${project.title} preview`} fill sizes="(max-width: 860px) 100vw, 920px" />
              </div>
            ) : (
              <div className={styles.previewFallback} role="img" aria-label={`${project.title} generated preview`}>
                <p className={styles.previewFallbackTitle}>{project.title}</p>
                <p className={styles.previewFallbackTag}>{project.tagline}</p>
                <div className={styles.previewFallbackChips}>
                  {project.stack.slice(0, 4).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className={styles.grid}>
            <article className={styles.card}>
              <h3 className={styles.cardTitle}>Description</h3>
              <p>{project.description}</p>
            </article>

            <article className={styles.card}>
              <h3 className={styles.cardTitle}>Why It Was Built</h3>
              <p>{project.whyBuilt}</p>
            </article>

            <article className={styles.card}>
              <h3 className={styles.cardTitle}>Highlights</h3>
              <ul>
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className={styles.card}>
              <h3 className={styles.cardTitle}>Tech Stack</h3>
              <div className={styles.chips}>
                {project.stack.map((item) => (
                  <span key={item} className={styles.chip}>
                    {item}
                  </span>
                ))}
              </div>
            </article>

            <article className={styles.card}>
              <h3 className={styles.cardTitle}>Links</h3>
              <div className={styles.actions}>
                {project.githubUrl ? (
                  <a className={styles.action} href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    {project.repoLabel}
                  </a>
                ) : (
                  <span className={`${styles.action} ${styles.actionDisabled}`}>Repo Unavailable</span>
                )}
                {project.liveUrl ? (
                  <a className={styles.action} href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    {project.liveLabel}
                  </a>
                ) : (
                  <span className={`${styles.action} ${styles.actionDisabled}`}>No Live Demo</span>
                )}
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
