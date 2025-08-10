const fs = require('fs');

console.log('🎨 Setting up CSS and Tailwind...\n');

// Check required files
const requiredFiles = [
  { file: 'tailwind.config.js', description: 'Tailwind configuration' },
  { file: 'postcss.config.js', description: 'PostCSS configuration' },
  { file: 'src/app/globals.css', description: 'Global CSS with Tailwind imports' },
  { file: 'src/app/layout.tsx', description: 'Root layout importing CSS' }
];

let allGood = true;

requiredFiles.forEach(({ file, description }) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - ${description}`);
  } else {
    console.log(`❌ ${file} - Missing!`);
    allGood = false;
  }
});

// Check package.json for required dependencies
if (fs.existsSync('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = ['tailwindcss', 'autoprefixer', 'postcss'];
  const requiredMainDeps = ['tailwindcss-animate'];
  
  console.log('\n📦 Checking dependencies:');
  
  requiredDeps.forEach(dep => {
    if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`✅ ${dep} - ${packageJson.devDependencies[dep]}`);
    } else {
      console.log(`❌ ${dep} - Missing from devDependencies!`);
      allGood = false;
    }
  });
  
  requiredMainDeps.forEach(dep => {
    if ((packageJson.dependencies && packageJson.dependencies[dep]) || 
        (packageJson.devDependencies && packageJson.devDependencies[dep])) {
      const version = packageJson.dependencies[dep] || packageJson.devDependencies[dep];
      console.log(`✅ ${dep} - ${version}`);
    } else {
      console.log(`❌ ${dep} - Missing!`);
      allGood = false;
    }
  });
}

// Check CSS content
if (fs.existsSync('src/app/globals.css')) {
  const cssContent = fs.readFileSync('src/app/globals.css', 'utf8');
  console.log('\n🎨 CSS Configuration:');
  
  if (cssContent.includes('@tailwind base')) {
    console.log('✅ Tailwind base styles imported');
  } else {
    console.log('❌ Missing @tailwind base');
    allGood = false;
  }
  
  if (cssContent.includes('@tailwind components')) {
    console.log('✅ Tailwind components imported');
  } else {
    console.log('❌ Missing @tailwind components');
    allGood = false;
  }
  
  if (cssContent.includes('@tailwind utilities')) {
    console.log('✅ Tailwind utilities imported');
  } else {
    console.log('❌ Missing @tailwind utilities');
    allGood = false;
  }
  
  if (cssContent.includes('--primary:') && cssContent.includes('--background:')) {
    console.log('✅ CSS custom properties defined');
  } else {
    console.log('❌ Missing CSS custom properties');
    allGood = false;
  }
}

console.log('\n' + '='.repeat(50));

if (allGood) {
  console.log('🎉 CSS setup is complete!');
  console.log('\n📋 Next steps:');
  console.log('   1. Run: npm install');
  console.log('   2. Run: npm run dev');
  console.log('   3. Visit: http://localhost:3000/test-css');
  console.log('   4. Check: All styles should be working');
  
  console.log('\n🎨 CSS Features Available:');
  console.log('   • Tailwind CSS utility classes');
  console.log('   • Custom color scheme with CSS variables');
  console.log('   • shadcn/ui component styling');
  console.log('   • Custom animations and gradients');
  console.log('   • Responsive design utilities');
  console.log('   • Dark mode support');
} else {
  console.log('❌ CSS setup incomplete. Please check the missing files above.');
}

console.log('\n');