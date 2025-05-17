// This script demonstrates the steps needed to deploy a Next.js site to GitHub Pages
// Note: You don't need to run this script - it's just to show the process

// 1. First, modify your Next.js configuration to work with GitHub Pages
console.log("Step 1: Configure Next.js for GitHub Pages");
console.log(`
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enables static HTML export
  basePath: '',      // Set this if your site is not at the root domain
  images: {
    unoptimized: true, // For static export
  },
}

module.exports = nextConfig
`);

// 2. Add a GitHub workflow file to build and deploy your site
console.log("\nStep 2: Create a GitHub Actions workflow file");
console.log(`
// .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]  # or master, depending on your default branch

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: out  # The folder the action should deploy
          branch: gh-pages  # The branch the action should deploy to
`);

// 3. Configure GitHub Pages in repository settings
console.log("\nStep 3: Configure GitHub Pages in repository settings");
console.log(`
1. Go to your repository on GitHub
2. Click on "Settings"
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "gh-pages" branch and "/ (root)" folder
6. Click "Save"
`);

// 4. Create a .nojekyll file to prevent GitHub from using Jekyll
console.log("\nStep 4: Add a .nojekyll file to your repository");
console.log(`
// Create an empty file named .nojekyll in the root of your repository
// This prevents GitHub from processing your files with Jekyll
`);

console.log("\nAfter completing these steps, your site should be available at https://reyhanehayousefi.github.io");