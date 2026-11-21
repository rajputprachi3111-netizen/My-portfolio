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

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(urlObj.pathname);

  // 1. Direct match in dist
  let filePath = path.join(__dirname, 'dist', pathname === '/' ? 'index.html' : pathname);

  // 2. If not found in dist, check public
  if (!fs.existsSync(filePath)) {
    filePath = path.join(__dirname, 'public', pathname);
  }

  // 3. If extension omitted, try .js in dist
  if (!fs.existsSync(filePath) && !pathname.endsWith('.js')) {
    const tryJs = path.join(__dirname, 'dist', pathname + '.js');
    if (fs.existsSync(tryJs)) {
      filePath = tryJs;
    }
  }

  // 4. SPA fallback: if not a file, serve dist/index.html
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    filePath = path.join(__dirname, 'dist', 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': mime,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
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
