import { chromium } from 'playwright'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:3000/world', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(2000)

const info = await page.evaluate(() => {
  const mosaic = document.querySelector('[aria-label="Figure mosaic portrait"]')
  const cornerHud = document.querySelector('[data-global-corner-hud]')
  const scene = document.querySelector('[data-world-scene]')
  return {
    bodyClass: document.body.className,
    htmlClass: document.documentElement.className,
    cornerHudDisplay: cornerHud ? getComputedStyle(cornerHud).display : null,
    bodyBg: getComputedStyle(document.body).backgroundColor,
    sceneBg: scene ? getComputedStyle(scene).backgroundImage.slice(0, 80) : null,
    mosaicWidth: mosaic?.getBoundingClientRect().width ?? null,
    mosaicHeight: mosaic?.getBoundingClientRect().height ?? null,
    viewportWidth: window.innerWidth,
    mosaicPct: mosaic ? (mosaic.getBoundingClientRect().width / window.innerWidth) * 100 : null,
    hasCornerText: document.body.innerText.includes('LIVING DIGITAL WORLD'),
    hasTopNav: document.querySelector('[data-global-top-nav]')
      ? getComputedStyle(document.querySelector('[data-global-top-nav]')).display
      : null,
  }
})

console.log(JSON.stringify(info, null, 2))
await page.screenshot({ path: '.tmp-world-check-2.png', fullPage: false })
await browser.close()
