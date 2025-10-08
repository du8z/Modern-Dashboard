# 🚀 Quick Start Guide

## For Developers

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:5173

### 3. Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Fix linting issues |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | Validate TypeScript |
| `npm run prepare-deploy` | Full pre-deployment check |
| `npm run check-ready` | Verify production readiness |
| `npm run screenshots` | Generate screenshots (requires Playwright) |

---

## For Deployment

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"
   - Done! 🎉

### Option 2: Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Drag and drop the `dist` folder to [netlify.com/drop](https://app.netlify.com/drop)
   - Or use Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod
     ```

### Option 3: Other Platforms

Build command: `npm run build`  
Output directory: `dist`  
Node version: `18.x` or higher

---

## Pre-Deployment Checklist

Run this command to verify everything is ready:
```bash
npm run check-ready
```

This will check:
- ✅ All required files exist
- ✅ Configuration is optimized
- ✅ Build succeeds
- ✅ No critical issues

---

## Post-Deployment Tasks

### 1. Add Screenshots

**Option A: Manual**
- Take screenshots of your dashboard
- Save to `docs/screenshots/`
- See `docs/screenshots/README.md` for details

**Option B: Automated**
```bash
# Install Playwright
npm install -D playwright
npx playwright install chromium

# Start dev server
npm run dev

# Generate screenshots (in another terminal)
npm run screenshots
```

### 2. Update URLs

Replace placeholder URLs with your actual domain in:
- `index.html` (meta tags)
- `README.md` (demo link)
- `robots.txt` (sitemap URL)

### 3. Enable Analytics (Optional)

```bash
npm install @vercel/analytics
```

Add to `src/main.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

// In your root component
<Analytics />
```

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist .vite
npm install
npm run build
```

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or use a different port
npm run dev -- --port 3000
```

### TypeScript Errors
```bash
# Check for type errors
npm run type-check

# Update TypeScript
npm install -D typescript@latest
```

---

## Project Structure

```
modern-dashboard/
├── src/
│   ├── components/      # Reusable components
│   │   └── ui/         # UI components (Card, etc.)
│   ├── pages/          # Page components
│   ├── data/           # Mock data
│   ├── utils/          # Utility functions
│   └── App.tsx         # Root component
├── public/             # Static assets
├── docs/               # Documentation
├── scripts/            # Utility scripts
├── dist/               # Build output (generated)
└── package.json        # Dependencies
```

---

## Need Help?

- 📖 **Full Documentation**: See [README.md](README.md)
- 🚀 **Deployment Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- ⚡ **Performance**: See [PERFORMANCE.md](PERFORMANCE.md)
- 📊 **Optimization Summary**: See [OPTIMIZATION_SUMMARY.md](OPTIMIZATION_SUMMARY.md)

---

## Quick Tips

💡 **Hot Module Replacement (HMR)**: Changes appear instantly in dev mode  
💡 **Dark Mode**: Toggle in the top-right corner  
💡 **Responsive**: Test on mobile with browser DevTools  
💡 **Type Safety**: TypeScript catches errors before runtime  
💡 **Code Quality**: ESLint + Prettier keep code clean  

---

**Happy Coding!** 🎉
