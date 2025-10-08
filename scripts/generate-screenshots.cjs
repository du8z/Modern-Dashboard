/**
 * Automated Screenshot Generator
 * 
 * This script uses Playwright to automatically capture screenshots
 * of the dashboard for documentation purposes.
 * 
 * Usage:
 *   1. Start dev server: npm run dev
 *   2. Run script: node scripts/generate-screenshots.js
 * 
 * Requirements:
 *   npm install -D playwright
 *   npx playwright install chromium
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5173';
const SCREENSHOTS_DIR = path.join(__dirname, '../docs/screenshots');
const PUBLIC_SCREENSHOTS_DIR = path.join(__dirname, '../public/screenshots');

// Ensure directories exist
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}
if (!fs.existsSync(PUBLIC_SCREENSHOTS_DIR)) {
  fs.mkdirSync(PUBLIC_SCREENSHOTS_DIR, { recursive: true });
}

async function generateScreenshots() {
  console.log('🚀 Starting screenshot generation...\n');

  const browser = await chromium.launch({
    headless: true,
  });

  try {
    // Desktop screenshots
    console.log('📸 Capturing desktop screenshots...');
    await captureDesktopScreenshots(browser);

    // Mobile screenshots
    console.log('📱 Capturing mobile screenshots...');
    await captureMobileScreenshots(browser);

    // OG Image
    console.log('🎨 Generating OG image...');
    await generateOGImage(browser);

    console.log('\n✅ All screenshots generated successfully!');
    console.log(`📁 Screenshots saved to: ${SCREENSHOTS_DIR}`);
    console.log(`📁 Public screenshots saved to: ${PUBLIC_SCREENSHOTS_DIR}`);
  } catch (error) {
    console.error('❌ Error generating screenshots:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

async function captureDesktopScreenshots(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2, // Retina display
  });

  const page = await context.newPage();

  // Wait for app to load
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // Wait for animations

  // 1. Dashboard (Light Mode)
  console.log('  → Dashboard (light mode)');
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'dashboard.png'),
    fullPage: false,
  });
  await page.screenshot({
    path: path.join(PUBLIC_SCREENSHOTS_DIR, 'dashboard.png'),
    fullPage: false,
  });

  // 2. Analytics Page
  console.log('  → Analytics page');
  await page.click('a[href="/analytics"]');
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'analytics.png'),
    fullPage: false,
  });
  await page.screenshot({
    path: path.join(PUBLIC_SCREENSHOTS_DIR, 'analytics.png'),
    fullPage: false,
  });

  // 3. Products Page
  console.log('  → Products page');
  await page.click('a[href="/products"]');
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'products.png'),
    fullPage: false,
  });

  // 4. Dark Mode (back to dashboard)
  console.log('  → Dashboard (dark mode)');
  await page.click('a[href="/"]');
  await page.waitForTimeout(1000);
  
  // Toggle dark mode (adjust selector based on your implementation)
  const darkModeButton = await page.$('button[aria-label*="theme"], button[aria-label*="Theme"], button[title*="theme"], button[title*="Theme"]');
  if (darkModeButton) {
    await darkModeButton.click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'dark-mode.png'),
      fullPage: false,
    });
  } else {
    console.log('  ⚠️  Dark mode toggle not found, skipping dark mode screenshot');
  }

  await context.close();
}

async function captureMobileScreenshots(browser) {
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 }, // iPhone SE
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  console.log('  → Mobile dashboard');
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'mobile.png'),
    fullPage: false,
  });

  await context.close();
}

async function generateOGImage(browser) {
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 }, // OG image size
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  
  // Create a simple OG image with HTML
  const ogHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            width: 1200px;
            height: 630px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            color: white;
          }
          .container {
            text-align: center;
            padding: 60px;
          }
          h1 {
            font-size: 72px;
            font-weight: 700;
            margin: 0 0 20px 0;
            text-shadow: 0 4px 6px rgba(0,0,0,0.3);
          }
          .icon {
            font-size: 120px;
            margin-bottom: 20px;
          }
          p {
            font-size: 32px;
            font-weight: 400;
            margin: 0;
            opacity: 0.95;
          }
          .badge {
            display: inline-block;
            background: rgba(255,255,255,0.2);
            padding: 12px 24px;
            border-radius: 50px;
            font-size: 20px;
            margin-top: 30px;
            backdrop-filter: blur(10px);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="icon">📊</div>
          <h1>Modern Dashboard</h1>
          <p>Analytics & Business Intelligence Platform</p>
          <div class="badge">React • TypeScript • Tailwind CSS</div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(ogHTML);
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: path.join(__dirname, '../public/og-image.png'),
    fullPage: false,
  });

  await context.close();
}

// Run the script
generateScreenshots().catch(console.error);
