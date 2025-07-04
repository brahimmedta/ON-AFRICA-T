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
   git commit -m "Fix admin 404 error and improve deployment configuration"
   git push origin main
   ```

### Netlify Configuration

The project includes `netlify.toml` with optimized settings:
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Node.js version: 18
- Proper redirects for SPA and admin routes
- Security headers for admin routes

### Admin Access Fix

The 404 error for `/admin/` has been resolved with:

1. **Enhanced Redirects**: Both `netlify.toml` and `public/_redirects` now properly handle admin routes
2. **Improved Build Configuration**: `vite.config.ts` ensures admin files are copied to the build output
3. **Robust Admin Interface**: Enhanced error handling and authentication flow

### Verification Checklist

Before pushing to GitHub, verify:
- [ ] `package.json` exists in root directory
- [ ] `vite.config.ts` is properly configured with `copyPublicDir: true`
- [ ] `src/main.tsx` exists and imports App correctly
- [ ] `index.html` is in root directory
- [ ] `public/admin/index.html` and `public/admin/config.yml` exist
- [ ] `netlify.toml` has correct redirects for admin routes
- [ ] `public/_redirects` includes admin route handling
- [ ] All dependencies are listed in package.json
- [ ] Build command `npm run build` works locally
- [ ] Preview with `npm run preview` shows correct site

### Troubleshooting Admin 404 Error

If you still encounter 404 errors for `/admin/`:

1. **Check Build Output**: Ensure `dist/admin/` folder exists after build
2. **Verify Redirects**: Confirm both `netlify.toml` and `_redirects` are deployed
3. **Clear Cache**: Clear browser cache and try again
4. **Check Netlify Logs**: Review deployment logs for any errors
5. **Test Locally**: Use `npm run preview` to test the built site locally

### Post-Deployment

After successful deployment:
1. Test the live site functionality at https://onafricatp.com
2. Verify admin panel access at https://onafricatp.com/admin/
3. Test admin login at https://onafricatp.com/admin-login
4. Verify Netlify CMS functionality
5. Check all navigation and responsive design
6. Test content editing and publishing workflow

### Admin URLs

Both of these URLs should now work correctly:
- https://onafricatp.com/admin/ (Direct CMS access)
- https://onafricatp.com/admin-login (Login interface)

The 404 error should be completely resolved with these configuration changes.