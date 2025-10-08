# 🛠️ Scripts Directory

This directory contains utility scripts for the Modern Dashboard project.

## Available Scripts

### 1. check-production-ready.cjs

**Purpose**: Verifies that the project is ready for production deployment.

**Usage**:
```bash
npm run check-ready
```

**What it checks**:
- ✅ Required files exist (configs, documentation, etc.)
- ✅ Build configuration is optimized
- ✅ SEO meta tags are present
- ✅ Security headers configured
- ✅ Build succeeds without errors
- ✅ Output files are generated correctly

**Output**: Pass/fail report with actionable recommendations

---

### 2. generate-screenshots.cjs

**Purpose**: Automatically generates screenshots for documentation using Playwright.

**Prerequisites**:
```bash
npm install -D playwright
npx playwright install chromium
```

**Usage**:
```bash
# Start dev server first
npm run dev

# In another terminal, run:
npm run screenshots
```

**What it generates**:
- `docs/screenshots/dashboard.png` - Dashboard overview (light mode)
- `docs/screenshots/analytics.png` - Analytics page
- `docs/screenshots/products.png` - Products page
- `docs/screenshots/dark-mode.png` - Dark mode view
- `docs/screenshots/mobile.png` - Mobile view
- `public/og-image.png` - Social sharing image (1200x630)

**Configuration**:
- Desktop viewport: 1280x720
- Mobile viewport: 375x667 (iPhone SE)
- Device scale factor: 2 (Retina)
- Base URL: http://localhost:5173

---

## Creating New Scripts

When adding new scripts to this directory:

1. **Use `.cjs` extension** (CommonJS) since package.json has `"type": "module"`
2. **Add to package.json scripts** for easy access
3. **Document in this README**
4. **Include error handling**
5. **Add helpful console output**

### Example Script Template

```javascript
#!/usr/bin/env node

/**
 * Script Name
 * 
 * Description of what the script does
 * 
 * Usage: npm run script-name
 */

const fs = require('fs');
const path = require('path');

async function main() {
  try {
    console.log('🚀 Starting script...\n');
    
    // Your script logic here
    
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
```

---

## Troubleshooting

### Script won't run
```bash
# Make sure you're in the project root
cd /path/to/modern-dashboard

# Check Node.js version (should be 18+)
node --version

# Try running directly
node scripts/script-name.cjs
```

### Playwright issues
```bash
# Reinstall Playwright browsers
npx playwright install --force

# Check Playwright installation
npx playwright --version
```

### Permission denied
```bash
# Make script executable (Unix/Mac)
chmod +x scripts/script-name.cjs
```

---

## Best Practices

1. **Always check prerequisites** before running scripts
2. **Use meaningful console output** with emojis for clarity
3. **Handle errors gracefully** with try-catch blocks
4. **Exit with proper codes** (0 for success, 1 for failure)
5. **Document all scripts** in this README
6. **Test scripts** before committing

---

## Future Script Ideas

Potential scripts to add:

- [ ] **generate-sitemap.cjs** - Create sitemap.xml
- [ ] **optimize-images.cjs** - Compress images
- [ ] **analyze-bundle.cjs** - Detailed bundle analysis
- [ ] **check-dependencies.cjs** - Check for outdated packages
- [ ] **generate-changelog.cjs** - Auto-generate CHANGELOG.md
- [ ] **deploy.cjs** - Automated deployment script
- [ ] **backup.cjs** - Backup important files

---

## Contributing

When contributing new scripts:

1. Follow the existing code style
2. Add comprehensive error handling
3. Update this README
4. Test thoroughly
5. Add to package.json scripts section

---

**Last Updated**: 2025-10-08
