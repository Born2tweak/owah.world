import { HTMLAttributes } from 'react'
import styles from './LiquidGlass.module.css'

type GlassVariant = 'default' | 'heavy' | 'light'

interface LiquidGlassProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant
  radius?: 'sm' | 'default' | 'lg'
}

export default function LiquidGlass({
  variant = 'default',
  radius = 'default',
  className = '',
  children,
  ...rest
}: LiquidGlassProps) {
  return (
    <div
      className={[
        styles.glass,
        styles[`variant--${variant}`],
        styles[`radius--${radius}`],
        className,
      ].join(' ')}
      {...rest}
    >
      <div className={styles.inner}>{children}</div>
    </div>
  )
}
