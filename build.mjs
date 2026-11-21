import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('--- Starting Production Build ---');

// 1. Ensure dist and public exist
const distDir = path.join(__dirname, 'dist');
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

// 2. Compile Tailwind CSS
console.log('Compiling Tailwind CSS...');
try {
  execSync('node node_modules/tailwindcss/lib/cli.js -i src/index.css -o dist/style.css --minify', { stdio: 'inherit' });
  fs.copyFileSync(path.join(distDir, 'style.css'), path.join(publicDir, 'style.css'));
} catch (e) {
  console.warn('Tailwind CLI via node_modules failed, trying npx tailwindcss...');
  try {
    execSync('npx tailwindcss -i src/index.css -o dist/style.css --minify', { stdio: 'inherit' });
    fs.copyFileSync(path.join(distDir, 'style.css'), path.join(publicDir, 'style.css'));
  } catch (err) {
    console.error('Tailwind build error:', err);
  }
}

// 3. Compile TypeScript
console.log('Compiling TypeScript...');
try {
  execSync('node node_modules/typescript/bin/tsc', { stdio: 'inherit' });
} catch (e) {
  console.warn('TSC via node_modules failed, trying npx tsc...');
  execSync('npx tsc', { stdio: 'inherit' });
}

// 4. Transform JS in dist for universal browser ESM
const BARE_IMPORTS = {
  'react': 'https://esm.sh/react@18.3.1',
  'react-dom': 'https://esm.sh/react-dom@18.3.1',
  'react-dom/client': 'https://esm.sh/react-dom@18.3.1/client',
  'react/jsx-runtime': 'https://esm.sh/react@18.3.1/jsx-runtime',
  'three': 'https://esm.sh/three@0.168.0',
  '@react-three/fiber': 'https://esm.sh/@react-three/fiber@8.17.10?external=react,react-dom,three',
  '@react-three/drei': 'https://esm.sh/@react-three/drei@9.117.0?external=react,react-dom,three,@react-three/fiber',
  'lucide-react': 'https://esm.sh/lucide-react@0.454.0',
  'canvas-confetti': 'https://esm.sh/canvas-confetti@1.9.4'
};

function transformFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace bare specifiers
  for (const [bare, target] of Object.entries(BARE_IMPORTS)) {
    const regex = new RegExp(`(from\\s+['"])${bare}(['"])`, 'g');
    content = content.replace(regex, `$1${target}$2`);
  }

  // Append .js to relative imports
  content = content.replace(/(from\s+['"]\.[^'"]+?)(['"])/g, (match, p1, p2) => {
    if (p1.endsWith('.js') || p1.endsWith('.css') || p1.endsWith('.json')) {
      return match;
    }
    return `${p1}.js${p2}`;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      transformFile(fullPath);
    }
  }
}

console.log('Transforming ES modules for browser execution...');
walkDir(distDir);

// 5. Copy public assets into dist
function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('Copying static assets into dist...');
copyRecursiveSync(publicDir, distDir);

// 6. Copy index.html into dist/index.html
console.log('Generating dist/index.html...');
fs.copyFileSync(path.join(__dirname, 'index.html'), path.join(distDir, 'index.html'));

console.log('=== Production Build Complete! ===');
console.log('Output ready in ./dist with index.html, style.css, and ES modules.');
