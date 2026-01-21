const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const htmlFiles = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

let counter = 1;
const mapping = [];

htmlFiles.forEach(file => {
  const filePath = path.join(cwd, file);
  let text = fs.readFileSync(filePath, 'utf8');
  const original = text;

  // backup
  try { fs.writeFileSync(filePath + '.bak', original, 'utf8'); } catch (e) { console.error('备份失败', file, e); }

  // 寻找所有 <img ... src="images/..."> 的出现，排除 avatars 目录和 placeholder/autumn/avatars 已存在的占位
  const imgRegex = /<img\b[^>]*\bsrc\s*=\s*(["'])(images\/[^"']+?)\1[^>]*>/gi;

  text = text.replace(imgRegex, (tag, q, src) => {
    // 排除不需要替换的路径
    if (/^images\/avatars\//i.test(src)) return tag;
    if (/placeholder-\d+\.jpg$/i.test(src)) return tag;
    if (/autumn-\d+\.jpg$/i.test(src)) return tag;
    if (/avatar-.*\.jpg$/i.test(src)) return tag;

    const placeholder = `images/placeholder-${counter}.jpg`;

    // 保存映射信息（文件、原始 src、占位符、周边文本片段）
    const idx = text.indexOf(tag);
    const contextStart = Math.max(0, idx - 80);
    const context = text.slice(contextStart, contextStart + 200).replace(/\n/g, ' ');
    mapping.push({ placeholder, original: src, file, context });

    counter++;

    // 替换 src 属性为 placeholder
    if (/\bsrc\s*=\s*(["'])(.*?)\1/i.test(tag)) {
      return tag.replace(/\bsrc\s*=\s*(["'])(.*?)\1/i, `src="${placeholder}"`);
    }
    return tag;
  });

  if (text !== original) {
    fs.writeFileSync(filePath, text, 'utf8');
    console.log('Updated', file);
  }
});

// 写入映射文件
const mapPath = path.join(cwd, 'scripts', 'placeholders_map.json');
fs.writeFileSync(mapPath, JSON.stringify({ generated: counter - 1, mapping }, null, 2), 'utf8');
console.log(`Generated ${counter - 1} placeholders. Mapping saved to ${mapPath}`);
