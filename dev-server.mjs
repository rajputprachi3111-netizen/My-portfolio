import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 5173;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.blend': 'application/octet-stream',
  '.json': 'application/json'
};

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

function transformJs(content) {
  // 1. Replace bare specifiers
  let transformed = content;
  for (const [bare, target] of Object.entries(BARE_IMPORTS)) {
    // Replace import ... from 'bare' or "bare"
    const regex = new RegExp(`(from\\s+['"])${bare}(['"])`, 'g');
    transformed = transformed.replace(regex, `$1${target}$2`);
  }

  // 2. Append .js to local relative imports without extension
  transformed = transformed.replace(/(from\s+['"]\.[^'"]+?)(['"])/g, (match, p1, p2) => {
    if (p1.endsWith('.js') || p1.endsWith('.css') || p1.endsWith('.json')) {
      return match;
    }
    return `${p1}.js${p2}`;
  });

  return transformed;
}

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(urlObj.pathname);

  // Default to index.html
  if (pathname === '/' || pathname === '/index.html') {
    const indexPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(fs.readFileSync(indexPath));
      return;
    }
  }

  // Check public folder first
  let filePath = path.join(__dirname, 'public', pathname);
  if (!fs.existsSync(filePath)) {
    // Check dist folder
    filePath = path.join(__dirname, 'dist', pathname);
  }
  if (!fs.existsSync(filePath) && !pathname.endsWith('.js')) {
    // Try adding .js
    const tryJs = path.join(__dirname, 'dist', pathname + '.js');
    if (fs.existsSync(tryJs)) {
      filePath = tryJs;
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': mime,
      'Access-Control-Allow-Origin': '*'
    });

    if (ext === '.js' || ext === '.mjs') {
      const content = fs.readFileSync(filePath, 'utf-8');
      res.end(transformJs(content));
    } else {
      fs.createReadStream(filePath).pipe(res);
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end(`Not Found: ${pathname}`);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`🚀 [THE ANGRY EAST INDIAN'S WORK] ORBITAL HUD ONLINE!`);
  console.log(`📡 Local Viewport: http://localhost:${PORT}`);
  console.log(`🛰️ Network Telemetry: http://0.0.0.0:${PORT}`);
  console.log(`======================================================\n`);
});
