const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const htmlFiles = fs.readdirSync(cwd).filter(f => f.endsWith('.html'));

// 要替换的图片 src 模式（优先级顺序）
const patterns = [
  /images\/user-share-\d+\.jpg/gi,
  /images\/trip-\d+\.jpg/gi,
  /images\/trip-\w+\.jpg/gi,
  /images\/user[-_]?share[-_]?\d*\.jpg/gi,
  /images\/.*?share.*?\.jpg/gi
];

let counter = 1;
const max = 16; // 将附件映射到 images/autumn-1.jpg..images/autumn-16.jpg
const replacedFiles = [];

htmlFiles.forEach(file => {
  const filePath = path.join(cwd, file);
  const original = fs.readFileSync(filePath, 'utf8');
  let text = original;

  // 先做备份
  try { fs.writeFileSync(filePath + '.bak', original, 'utf8'); } catch (e) { console.error('备份失败', file, e); }

  patterns.forEach(pat => {
    text = text.replace(pat, (match) => {
      if (counter > max) counter = 1; // 循环使用图片
      const newPath = `images/autumn-${counter}.jpg`;
      counter++;
      return newPath;
    });
  });

  if (text !== original) {
    fs.writeFileSync(filePath, text, 'utf8');
    replacedFiles.push(file);
    console.log('Updated', file);
  }
});

console.log('Replaced image references in files:', replacedFiles);
console.log(`Remember to save your attached autumn images as images/autumn-1.jpg .. images/autumn-${max}.jpg`);
