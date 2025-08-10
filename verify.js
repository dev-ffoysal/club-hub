const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Club Management Hub setup...\n');

// Check essential files
const essentialFiles = [
  'package.json',
  'next.config.js',
  'tailwind.config.js',
  'tsconfig.json',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/globals.css',
  'src/lib/utils.ts',
  'src/types/index.ts'
];

const missingFiles = [];
essentialFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.log('❌ Missing essential files:');
  missingFiles.forEach(file => console.log(`   - ${file}`));
  console.log('\n');
} else {
  console.log('✅ All essential files present\n');
}

// Check UI components
const uiComponents = [
  'src/components/ui/button.tsx',
  'src/components/ui/card.tsx',
  'src/components/ui/input.tsx',
  'src/components/ui/badge.tsx',
  'src/components/ui/tabs.tsx',
  'src/components/ui/select.tsx',
  'src/components/ui/textarea.tsx'
];

const missingComponents = [];
uiComponents.forEach(component => {
  if (!fs.existsSync(component)) {
    missingComponents.push(component);
  }
});

if (missingComponents.length > 0) {
  console.log('❌ Missing UI components:');
  missingComponents.forEach(component => console.log(`   - ${component}`));
  console.log('\n');
} else {
  console.log('✅ All UI components present\n');
}

// Check pages
const pages = [
  'src/app/clubs/page.tsx',
  'src/app/events/page.tsx',
  'src/app/apply/page.tsx',
  'src/app/dashboard/page.tsx',
  'src/app/admin/dashboard/page.tsx',
  'src/app/super-admin/dashboard/page.tsx'
];

const missingPages = [];
pages.forEach(page => {
  if (!fs.existsSync(page)) {
    missingPages.push(page);
  }
});

if (missingPages.length > 0) {
  console.log('❌ Missing pages:');
  missingPages.forEach(page => console.log(`   - ${page}`));
  console.log('\n');
} else {
  console.log('✅ All pages present\n');
}

// Check package.json dependencies
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = ['next', 'react', 'react-dom', 'tailwindcss', 'typescript'];
  const missingDeps = requiredDeps.filter(dep => 
    !packageJson.dependencies[dep] && !packageJson.devDependencies[dep]
  );

  if (missingDeps.length > 0) {
    console.log('❌ Missing dependencies:');
    missingDeps.forEach(dep => console.log(`   - ${dep}`));
    console.log('\n');
  } else {
    console.log('✅ All required dependencies present\n');
  }
} catch (error) {
  console.log('❌ Error reading package.json\n');
}

// Final status
const totalIssues = missingFiles.length + missingComponents.length + missingPages.length;

if (totalIssues === 0) {
  console.log('🎉 Setup verification complete! Everything looks good.');
  console.log('\n📋 Next steps:');
  console.log('   1. Run: npm install');
  console.log('   2. Run: npm run dev');
  console.log('   3. Open: http://localhost:3000');
  console.log('\n🚀 Or use the quick start scripts:');
  console.log('   Windows: start.bat');
  console.log('   Linux/Mac: ./start.sh');
} else {
  console.log(`❌ Found ${totalIssues} issues. Please check the missing files above.`);
}

console.log('\n');