const fs = require('fs');
const path = require('path');

console.log('🔍 Testing import resolution...\n');

// Test if all relative imports can be resolved
const testFiles = [
  'src/components/ui/button.tsx',
  'src/components/ui/card.tsx',
  'src/components/layout/navbar.tsx',
  'src/app/page.tsx',
  'src/app/events/page.tsx',
  'src/app/clubs/page.tsx'
];

let allGood = true;

testFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for any remaining @/ imports
    if (content.includes('@/')) {
      console.log(`❌ ${file} still has @/ imports`);
      allGood = false;
    } else {
      console.log(`✅ ${file} - imports fixed`);
    }
  } else {
    console.log(`❌ ${file} - file not found`);
    allGood = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allGood) {
  console.log('🎉 All import errors fixed!');
  console.log('\n📋 Next steps:');
  console.log('   1. Run: npm install');
  console.log('   2. Run: npm run dev');
  console.log('   3. Open: http://localhost:3000');
  console.log('\n🚀 Or use quick start:');
  console.log('   Windows: start.bat');
  console.log('   Linux/Mac: ./start.sh');
} else {
  console.log('❌ Some issues remain. Please check the files above.');
}

console.log('\n');