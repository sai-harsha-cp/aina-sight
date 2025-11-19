// This script is a placeholder - we'll use edit_tool with more context to make unique replacements
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../imports/Frame3.tsx');
const content = fs.readFileSync(filePath, 'utf8');

// Replace all instances of text-[9px] with text-[7px]
const newContent = content.replace(/className="text-\[9px\]"/g, 'className="text-[7px]"');

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Replaced all tooltip text sizes from 9px to 7px');
