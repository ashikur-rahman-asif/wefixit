const fs = require('fs');
const path = require('path');

const ROOT_DIR = __dirname;
const SRC_DIRS = ['app', 'components', 'features', 'stores', 'lib', 'hooks'];

function updateClasses(content) {
  let cleaned = content;
  
  cleaned = cleaned.replace(/(?<!:)\/\/.*$/gm, '');
  // Remove multi line comments
  cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, '');
  return cleaned;
}

function processFile(filePath) {
  if (!filePath.match(/\.(tsx|ts|js|jsx)$/)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = updateClasses(content);

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Removed comments in: ${filePath}`);
  }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

console.log('Starting comment removal...');
for (const dir of SRC_DIRS) {
  walkDir(path.join(ROOT_DIR, dir));
}
console.log('Finished removing comments.');
