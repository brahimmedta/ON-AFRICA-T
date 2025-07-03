# Deployment Guide for ON AFRICA TP

## GitHub Repository Setup

To push this project to GitHub repository: https://github.com/brahimmedta/ON-AFRICA-TP11

### Required Files Structure

```
ON-AFRICA-TP11/
├── package.json                 ✓ (Root level)
├── package-lock.json           ✓ (Auto-generated)
├── vite.config.ts              ✓ (Build configuration)
├── netlify.toml                ✓ (Netlify deployment config)
├── index.html                  ✓ (Main HTML file)
├── README.md                   ✓ (Project documentation)
├── .gitignore                  ✓ (Git ignore rules)
├── tsconfig.json               ✓ (TypeScript config)
├── tsconfig.app.json           ✓ (App TypeScript config)
├── tsconfig.node.json          ✓ (Node TypeScript config)
├── tailwind.config.js          ✓ (Tailwind CSS config)
├── postcss.config.js           ✓ (PostCSS config)
├── eslint.config.js            ✓ (ESLint config)
├── src/                        ✓ (Source code)
│   ├── main.tsx               ✓ (Entry point)
│   ├── App.tsx                ✓ (Main component)
│   ├── index.css              ✓ (Global styles)
│   ├── vite-env.d.ts          ✓ (Vite types)
│   ├── components/            ✓ (React components)
│   └── data/                  ✓ (JSON data files)
└── public/                     ✓ (Static assets)
    ├── _redirects             ✓ (Netlify redirects)
    └── admin/                 ✓ (Netlify CMS)
        ├── index.html         ✓ (CMS interface)
        └── config.yml         ✓ (CMS configuration)
```

### Steps to Deploy

1. **Clone or Initialize Repository**
   ```bash
   git clone https://github.com/brahimmedta/ON-AFRICA-TP11.git
   cd ON-AFRICA-TP11
   ```

2. **Copy All Project Files**
   Copy all files from this Bolt project to your local repository folder.

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Test Build Locally**
   ```bash
   npm run build
   npm run preview
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "Initial commit: ON AFRICA TP website"
   git push origin main
   ```

### Netlify Configuration

The project includes `netlify.toml` with optimized settings:
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Node.js version: 18
- Proper redirects for SPA and admin routes

### Verification Checklist

Before pushing to GitHub, verify:
- [ ] `package.json` exists in root directory
- [ ] `vite.config.ts` is properly configured
- [ ] `src/main.tsx` exists and imports App correctly
- [ ] `index.html` is in root directory
- [ ] All dependencies are listed in package.json
- [ ] Build command `npm run build` works locally
- [ ] Preview with `npm run preview` shows correct site

### Troubleshooting

If Netlify build fails:
1. Check that `package.json` is in the repository root
2. Verify all dependencies are properly listed
3. Ensure `vite.config.ts` has correct build settings
4. Check that `netlify.toml` is properly configured

### Post-Deployment

After successful deployment:
1. Test the live site functionality
2. Verify admin panel at `/admin-login`
3. Test Netlify CMS functionality
4. Check all navigation and responsive design