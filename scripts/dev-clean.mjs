import { rmSync } from 'node:fs'
import { spawn } from 'node:child_process'

rmSync('.next', { recursive: true, force: true })

const child = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
})

child.on('exit', (code) => process.exit(code ?? 0))
