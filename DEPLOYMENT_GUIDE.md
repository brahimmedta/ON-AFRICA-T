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
│   └── utils/                 ✓ (Utility functions)
└── public/                     ✓ (Static assets)
    ├── _redirects             ✓ (Netlify redirects)
    ├── data/                  ✓ (JSON data files)
    │   ├── hero.json          ✓ (Hero section data)
    │   ├── director.json      ✓ (Director message data)
    │   ├── settings.json      ✓ (Company settings)
    │   ├── services/          ✓ (Service data files)
    │   ├── partners/          ✓ (Partner data files)
    │   └── projects/          ✓ (Project data files)
    └── admin/                 ✓ (Netlify CMS)
        ├── index.html         ✓ (CMS interface)
        ├── config.yml         ✓ (CMS configuration)
        └── preview.css        ✓ (CMS preview styles)
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
   git commit -m "Fix JSON data loading by moving data files to public directory"
   git push origin main
   ```

### Netlify Configuration

The project includes `netlify.toml` with optimized settings:
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Node.js version: 18
- Proper redirects for SPA and admin routes
- Security headers for admin routes

### Data Files Location Fix

**IMPORTANT:** The JSON data files have been moved from `src/data/` to `public/data/` to resolve the "Unexpected token '<'" error. This ensures that:

1. **Static Asset Serving**: Data files in `public/data/` are copied to `dist/data/` during build
2. **Correct Content-Type**: Server serves JSON files with proper `application/json` headers
3. **No HTML Fallback**: Prevents server from returning `index.html` when JSON files are requested
4. **Runtime Access**: Components can fetch data from `/data/filename.json` paths

### Data Loading Architecture

The application uses a robust data loading system:

- **`useDataLoader<T>`**: Hook for loading single JSON files
- **`useMultipleDataLoader<T>`**: Hook for loading multiple JSON files
- **`loadSingleData<T>`**: Function for direct JSON file loading
- **Error Handling**: Comprehensive error handling with loading states
- **Content-Type Validation**: Ensures responses are valid JSON

### Verification Checklist

Before pushing to GitHub, verify:
- [ ] `package.json` exists in root directory
- [ ] `vite.config.ts` is properly configured with `copyPublicDir: true`
- [ ] `src/main.tsx` exists and imports App correctly
- [ ] `index.html` is in root directory
- [ ] `public/data/` directory contains all JSON files
- [ ] `public/admin/index.html` and `public/admin/config.yml` exist
- [ ] `netlify.toml` has correct redirects for admin routes
- [ ] `public/_redirects` includes admin route handling
- [ ] All dependencies are listed in package.json
- [ ] Build command `npm run build` works locally
- [ ] Preview with `npm run preview` shows correct site
- [ ] JSON data loads correctly without errors

### Troubleshooting JSON Loading Issues

If you encounter JSON loading errors:

1. **Check File Paths**: Ensure all JSON files are in `public/data/` directory
2. **Verify Build Output**: Confirm `dist/data/` folder exists after build
3. **Test Locally**: Use `npm run preview` to test built site
4. **Check Network Tab**: Inspect browser DevTools for failed requests
5. **Validate JSON**: Ensure all JSON files have valid syntax
6. **Clear Cache**: Clear browser cache and try again

### Post-Deployment

After successful deployment:
1. Test the live site functionality at https://onafricatp.com
2. Verify all JSON data loads correctly
3. Check admin panel access at https://onafricatp.com/admin/
4. Test admin login at https://onafricatp.com/admin-login
5. Verify Netlify CMS functionality
6. Check all navigation and responsive design
7. Test content editing and publishing workflow

### Admin URLs

Both of these URLs should work correctly:
- https://onafricatp.com/admin/ (Direct CMS access)
- https://onafricatp.com/admin-login (Login interface)

The JSON loading error should be completely resolved with the data files now properly located in the `public/data/` directory.