'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const ROOT = path.resolve(__dirname);
const PORT = 8123;
const DATA_DIR = path.join(ROOT, 'data');
const STATE_FILE = path.join(DATA_DIR, 'progress.json');
const MAX_BODY = 5 * 1024 * 1024;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon'
};

function readState(){
  try{ return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')); }
  catch(e){ return null; }
}

function writeState(state){
  if(!state || typeof state !== 'object' || Array.isArray(state)) throw new Error('bad state');
  fs.mkdirSync(DATA_DIR, {recursive: true});
  const tmp = STATE_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(state), 'utf8');
  fs.renameSync(tmp, STATE_FILE);
}

function send(res, code, body, type){
  res.writeHead(code, {
    'Content-Type': type || 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(body);
}

function serveStatic(req, res, urlPath){
  let rel = decodeURIComponent(urlPath.split('?')[0]);
  if(rel === '/' || rel === '') rel = '/index.html';
  const file = path.resolve(ROOT, '.' + rel);
  if(!file.startsWith(ROOT + path.sep)){
    send(res, 403, 'forbidden');
    return;
  }
  fs.stat(file, (err, st) => {
    if(err || !st.isFile()){
      send(res, 404, 'not found');
      return;
    }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': st.size,
      'Cache-Control': ext === '.html' ? 'no-store' : 'no-cache'
    });
    fs.createReadStream(file).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const url = req.url || '/';

  if(req.method === 'GET' && url.startsWith('/api/state.js')){
    const state = readState();
    const body = 'window.QB_SERVER_ON=true;window.QB_SERVER_STATE=' + JSON.stringify(state) + ';';
    send(res, 200, body, 'application/javascript; charset=utf-8');
    return;
  }

  if(req.method === 'POST' && url.startsWith('/api/state')){
    let size = 0;
    const chunks = [];
    req.on('data', chunk => {
      size += chunk.length;
      if(size > MAX_BODY){
        send(res, 413, 'too large');
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      if(size > MAX_BODY) return;
      try{
        const state = JSON.parse(Buffer.concat(chunks).toString('utf8'));
        writeState(state);
        send(res, 200, '{"ok":true}', 'application/json; charset=utf-8');
      }catch(e){
        send(res, 400, '{"ok":false}', 'application/json; charset=utf-8');
      }
    });
    return;
  }

  if(req.method !== 'GET' && req.method !== 'HEAD'){
    send(res, 405, 'method not allowed');
    return;
  }
  serveStatic(req, res, url);
});

server.on('error', err => {
  if(err.code === 'EADDRINUSE'){
    console.error('端口 ' + PORT + ' 已被占用，可能题库已经在运行。');
    console.error('请先关闭旧的命令行窗口，或打开 http://127.0.0.1:' + PORT + '/ 试试。');
  }else{
    console.error('启动失败：' + err.message);
  }
  process.exit(1);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('题库已启动：http://127.0.0.1:' + PORT + '/');
  console.log('进度会保存到 data/progress.json；关闭这个窗口即停止服务。');
  if(process.platform === 'win32'){
    exec('start "" "http://127.0.0.1:' + PORT + '/"', function(){});
  }
});
