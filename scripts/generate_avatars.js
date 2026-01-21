const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const avatarDir = path.join(cwd, 'images', 'avatars');
if (!fs.existsSync(avatarDir)) fs.mkdirSync(avatarDir, { recursive: true });

const htmlFiles = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));
let total = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(cwd, file);
  let text = fs.readFileSync(filePath, 'utf8');
  const original = text;

  // backup
  try { fs.writeFileSync(filePath + '.bak', original, 'utf8'); } catch (e) { console.error('备份失败', file, e); }

  // 更稳健地查找所有 img 标签，然后筛选 class 中包含 avatar 或 中文 “头像”的
  const imgRegex = /<img\b[^>]*>/gi;

  text = text.replace(imgRegex, (tag, offset, str) => {
    if (!/class\s*=\s*(['"])['"]*?(?:[^'\"]*?(?:avatar|头像)[^'\"]*?)\1/i.test(tag) && !/class\s*=\s*(['"]).*?(?:avatar|头像).*?\1/i.test(tag)) return tag;

    // 尝试从附近的 DOM 结构中抓取用户名（如 <div class="post-user-name">用户名</div>）
    const lookahead = str.slice(offset, offset + 600);
    const nameMatch = lookahead.match(/<div[^>]*class=['"]post-user-name['"][^>]*>([^<]+)<\/div>/i)
            || lookahead.match(/<span[^>]*class=['"]post-user-name['"][^>]*>([^<]+)<\/span>/i)
            || lookahead.match(/<div[^>]*class=['"]post-user['"][^>]*>([^<]+)<\/div>/i);

    let username = 'User';
    const altMatch = tag.match(/\balt\s*=\s*(['"])(.*?)\1/);
    if (nameMatch && nameMatch[1].trim()) username = nameMatch[1].trim();
    else if (altMatch && altMatch[2].trim() && !/用户头像|帖子图片/i.test(altMatch[2])) username = altMatch[2].trim();

    const initial = username.trim().charAt(0).toUpperCase() || 'U';

    // 生成唯一文件名（包含首字母便于识别）
    const id = 'avatar-' + Date.now().toString(36) + Math.random().toString(36).slice(2,6) + '-' + initial;
    const svgRel = `images/avatars/${id}.svg`;
    const svgPath = path.join(cwd, svgRel);

    // 随机背景色和边框色
    const bg = '#' + Math.floor(Math.random()*0xffffff).toString(16).padStart(6, '0');
    const border = '#' + Math.floor(Math.random()*0xffffff).toString(16).padStart(6, '0');

    // 方形、带边框、显示用户名首字母的 SVG（100x100）
    const svg = `<?xml version="1.0" encoding="UTF-8"?>\n`+
      `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">`+
      `<rect x="0" y="0" width="100" height="100" fill="${bg}" stroke="${border}" stroke-width="4" rx="6" ry="6"/>`+
      `<text x="50" y="55" font-size="42" fill="#ffffff" text-anchor="middle" font-family="Arial, Helvetica, sans-serif">${initial}</text>`+
      `</svg>`;

    try { fs.writeFileSync(svgPath, svg, 'utf8'); } catch (e) { console.error('写入 SVG 失败', svgPath, e); }

    total++;

    // 把 src 替换为新生成的 svg 路径；若没有 src，则插入一个
    if (/\bsrc\s*=\s*(['"]).*?\1/i.test(tag)) {
      return tag.replace(/\bsrc\s*=\s*(['"])(.*?)\1/i, `src="${svgRel}"`);
    } else {
      return tag.replace(/<img\b/i, `<img src="${svgRel}"`);
    }
  });

  if (text !== original) {
    fs.writeFileSync(filePath, text, 'utf8');
    console.log('Updated', file);
  }
});

console.log(`Generated ${total} avatars and updated HTML files.`);
