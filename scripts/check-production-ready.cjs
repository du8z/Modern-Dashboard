#!/usr/bin/env node

/**
 * Production Readiness Checker
 * 
 * This script verifies that all production optimizations are in place
 * before deployment.
 */

const fs = require('fs');
const path = require('path');

const checks = [];
let passed = 0;
let failed = 0;

function check(name, condition, message) {
  const status = condition ? '✅' : '❌';
  const result = { name, passed: condition, message };
  checks.push(result);
  
  if (condition) {
    passed++;
    console.log(`${status} ${name}`);
  } else {
    failed++;
    console.log(`${status} ${name}`);
    if (message) console.log(`   → ${message}`);
  }
}

console.log('\n🔍 Checking production readiness...\n');

// Check files exist
console.log('📁 File Checks:');
check(
  'Vite config exists',
  fs.existsSync('vite.config.ts'),
  'Create vite.config.ts with optimizations'
);

check(
  'Vercel config exists',
  fs.existsSync('vercel.json'),
  'Create vercel.json for deployment'
);

check(
  'README exists',
  fs.existsSync('README.md'),
  'Create README.md with documentation'
);

check(
  'LICENSE exists',
  fs.existsSync('LICENSE'),
  'Add LICENSE file (MIT recommended)'
);

check(
  'robots.txt exists',
  fs.existsSync('public/robots.txt'),
  'Create public/robots.txt for SEO'
);

check(
  'Web manifest exists',
  fs.existsSync('public/site.webmanifest'),
  'Create public/site.webmanifest for PWA'
);

console.log('\n⚙️  Configuration Checks:');

// Check vite.config.ts
if (fs.existsSync('vite.config.ts')) {
  const viteConfig = fs.readFileSync('vite.config.ts', 'utf8');
  
  check(
    'Build optimization configured',
    viteConfig.includes('build:') && viteConfig.includes('minify'),
    'Add build optimizations to vite.config.ts'
  );
  
  check(
    'Chunk splitting configured',
    viteConfig.includes('manualChunks'),
    'Add manual chunk splitting for better caching'
  );
  
  check(
    'Path aliases configured',
    viteConfig.includes('alias'),
    'Add path aliases for cleaner imports'
  );
}

// Check index.html
if (fs.existsSync('index.html')) {
  const indexHtml = fs.readFileSync('index.html', 'utf8');
  
  check(
    'Meta description present',
    indexHtml.includes('meta name="description"'),
    'Add meta description to index.html'
  );
  
  check(
    'Open Graph tags present',
    indexHtml.includes('og:title') && indexHtml.includes('og:description'),
    'Add Open Graph tags for social sharing'
  );
  
  check(
    'Twitter Card tags present',
    indexHtml.includes('twitter:card'),
    'Add Twitter Card tags'
  );
  
  check(
    'Security headers present',
    indexHtml.includes('X-Content-Type-Options'),
    'Add security meta tags'
  );
}

// Check package.json
if (fs.existsSync('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  console.log('\n📦 Package Checks:');
  
  check(
    'Build script exists',
    packageJson.scripts && packageJson.scripts.build,
    'Add build script to package.json'
  );
  
  check(
    'Preview script exists',
    packageJson.scripts && packageJson.scripts.preview,
    'Add preview script to package.json'
  );
  
  check(
    'Lint script exists',
    packageJson.scripts && packageJson.scripts.lint,
    'Add lint script to package.json'
  );
}

// Check for common issues
console.log('\n🔧 Common Issues:');

check(
  'node_modules exists',
  fs.existsSync('node_modules'),
  'Run npm install to install dependencies'
);

check(
  '.gitignore exists',
  fs.existsSync('.gitignore'),
  'Create .gitignore file'
);

check(
  'Screenshots directory exists',
  fs.existsSync('docs/screenshots'),
  'Create docs/screenshots directory'
);

// Try to build
console.log('\n🏗️  Build Test:');
const { execSync } = require('child_process');

try {
  console.log('   Building project...');
  execSync('npm run build', { stdio: 'pipe' });
  check('Build succeeds', true);
  
  // Check dist folder
  if (fs.existsSync('dist')) {
    const distFiles = fs.readdirSync('dist');
    check(
      'Build output exists',
      distFiles.length > 0,
      'Build produced no output files'
    );
    
    // Check for index.html
    check(
      'index.html in dist',
      fs.existsSync('dist/index.html'),
      'index.html not found in build output'
    );
    
    // Check for assets
    check(
      'Assets folder exists',
      fs.existsSync('dist/assets'),
      'Assets folder not found in build output'
    );
  }
} catch (error) {
  check('Build succeeds', false, 'Build failed - check error messages above');
}

// Summary
console.log('\n' + '='.repeat(50));
console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed === 0) {
  console.log('🎉 All checks passed! Your project is production ready!\n');
  console.log('Next steps:');
  console.log('  1. Add screenshots to docs/screenshots/');
  console.log('  2. Update URLs in documentation');
  console.log('  3. Deploy to Vercel');
  console.log('  4. Run Lighthouse audit\n');
  process.exit(0);
} else {
  console.log('⚠️  Some checks failed. Please fix the issues above.\n');
  console.log('Run this script again after making changes:\n');
  console.log('  node scripts/check-production-ready.js\n');
  process.exit(1);
}
