# 📸 Screenshots Guide

## Required Screenshots

To complete the documentation, add the following screenshots to this directory:

### 1. Dashboard Overview (`dashboard.png`)
- **Size**: 1280x720 or 1920x1080
- **Content**: Main dashboard page showing:
  - KPI stat cards (Revenue, Orders, Customers, Conversion)
  - Revenue overview chart
  - Sales by category pie chart
  - Top products table
- **Mode**: Light mode preferred

### 2. Analytics Page (`analytics.png`)
- **Size**: 1280x720 or 1920x1080
- **Content**: Analytics page showing:
  - Revenue, Profit, and Global Reach cards
  - Revenue vs Profit analysis chart
  - Sales by region pie chart
  - Monthly performance breakdown
- **Mode**: Light mode preferred

### 3. Dark Mode (`dark-mode.png`)
- **Size**: 1280x720 or 1920x1080
- **Content**: Any page in dark mode
- **Purpose**: Showcase dark theme support

### 4. Mobile View (`mobile.png`) - Optional
- **Size**: 375x667 (iPhone SE) or 390x844 (iPhone 12/13)
- **Content**: Dashboard on mobile
- **Purpose**: Show responsive design

### 5. Products Page (`products.png`) - Optional
- **Size**: 1280x720 or 1920x1080
- **Content**: Products page with table
- **Mode**: Light mode

## How to Take Screenshots

### Method 1: Browser DevTools
1. Open the dashboard in Chrome
2. Press `F12` to open DevTools
3. Click the device toolbar icon (or `Ctrl+Shift+M`)
4. Select "Responsive" and set dimensions
5. Take screenshot using browser's built-in tool

### Method 2: macOS Screenshot
1. Press `Cmd+Shift+4`
2. Press `Space` to capture window
3. Click on browser window
4. Screenshot saved to Desktop

### Method 3: Windows Snipping Tool
1. Press `Win+Shift+S`
2. Select area to capture
3. Save the screenshot

### Method 4: Automated with Playwright (Advanced)

Create a script to automatically capture screenshots:

```bash
npm install -D playwright
```

Create `scripts/screenshots.js`:
```javascript
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('http://localhost:5173');
  
  // Dashboard
  await page.screenshot({ path: 'docs/screenshots/dashboard.png' });
  
  // Analytics
  await page.click('a[href="/analytics"]');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'docs/screenshots/analytics.png' });
  
  // Dark mode
  await page.click('button[aria-label*="theme"]');
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'docs/screenshots/dark-mode.png' });
  
  await browser.close();
})();
```

Run: `node scripts/screenshots.js`

## Image Optimization

After taking screenshots, optimize them:

### Online Tools
- [TinyPNG](https://tinypng.com) - PNG compression
- [Squoosh](https://squoosh.app) - Advanced optimization
- [Compressor.io](https://compressor.io) - Multiple formats

### Command Line (ImageMagick)
```bash
# Install ImageMagick
brew install imagemagick  # macOS
apt-get install imagemagick  # Linux

# Optimize PNG
convert dashboard.png -quality 85 -strip dashboard-optimized.png

# Resize if needed
convert dashboard.png -resize 1280x720 dashboard-resized.png
```

### Optimal Settings
- **Format**: PNG for UI screenshots (better quality)
- **Compression**: 80-85% quality
- **Size**: 1280x720 (HD) or 1920x1080 (Full HD)
- **File size target**: < 500KB per image

## Social Media Image (OG Image)

Create an Open Graph image for social sharing:

### Requirements
- **Size**: 1200x630 pixels (Facebook/Twitter recommended)
- **Location**: `/public/og-image.png`
- **Content**: 
  - Project logo/name
  - Tagline
  - Key visual from dashboard
  - Branded colors

### Tools to Create OG Image
- [Canva](https://canva.com) - Free templates
- [Figma](https://figma.com) - Design tool
- [OG Image Generator](https://og-image.vercel.app) - Automated

## Checklist

- [ ] dashboard.png (1280x720, < 500KB)
- [ ] analytics.png (1280x720, < 500KB)
- [ ] dark-mode.png (1280x720, < 500KB)
- [ ] mobile.png (375x667, < 300KB) - Optional
- [ ] products.png (1280x720, < 500KB) - Optional
- [ ] /public/og-image.png (1200x630, < 200KB)
- [ ] All images optimized
- [ ] Images copied to /public/screenshots/ for manifest

## After Adding Screenshots

1. Update README.md image paths if needed
2. Update site.webmanifest with actual screenshot paths
3. Test social sharing with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
4. Test Twitter cards with [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

**Need help?** Open an issue or check the main README for more information.
