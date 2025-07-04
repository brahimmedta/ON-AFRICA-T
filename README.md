# ON AFRICA TP

Construction et Travaux Publics à Nouakchott, Mauritanie

## 🚀 Live Site
- **Production:** https://onafricatp.com
- **GitHub Repository:** https://github.com/brahimmedta/ON-AFRICA-TP11

## 📝 Content Management
- **Admin Panel:** https://onafricatp.com/admin/
- **Login Page:** https://onafricatp.com/admin-login

## 🏗️ Project Structure

```
ON-AFRICA-TP11/
├── package.json                 ✅ Root level
├── vite.config.ts              ✅ Build configuration
├── netlify.toml                ✅ Netlify deployment config
├── index.html                  ✅ Main HTML file
├── README.md                   ✅ Project documentation
├── .gitignore                  ✅ Git ignore rules
├── tsconfig.json               ✅ TypeScript config
├── tailwind.config.js          ✅ Tailwind CSS config
├── postcss.config.js           ✅ PostCSS config
├── eslint.config.js            ✅ ESLint config
├── src/                        ✅ Source code
│   ├── main.tsx               ✅ Entry point
│   ├── App.tsx                ✅ Main component
│   ├── index.css              ✅ Global styles
│   ├── components/            ✅ React components
│   └── utils/                 ✅ Utility functions
└── public/                     ✅ Static assets
    ├── _redirects             ✅ Netlify redirects
    ├── data/                  ✅ JSON data files
    │   ├── hero.json          ✅ Hero section data
    │   ├── director.json      ✅ Director message data
    │   ├── settings.json      ✅ Company settings
    │   ├── services/          ✅ Service data files
    │   ├── partners/          ✅ Partner data files
    │   └── projects/          ✅ Project data files
    └── admin/                 ✅ Netlify CMS
        ├── index.html         ✅ CMS interface
        ├── config.yml         ✅ CMS configuration
        └── preview.css        ✅ CMS preview styles
```

## 🛠️ Technologies

- **Frontend:** React 18 + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **CMS:** Netlify CMS
- **Hosting:** Netlify
- **Repository:** GitHub

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📋 Services

- Construction de bâtiments
- Travaux de terrassement et de voirie
- Aménagements agricoles
- Adduction d'eau potable
- Logistique et transport de marchandises
- Location de camions et d'engins lourds

## 🚀 Deployment

### Automatic Deployment
- **Trigger:** Push to `main` branch
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **Live URL:** https://onafricatp.com

### Manual Deployment
1. Push changes to GitHub
2. Netlify automatically builds and deploys
3. Changes appear live within minutes

## 📊 Data Architecture

### JSON Data Files Location
All data files are located in `public/data/` to ensure proper serving as static assets:

- **Company Data:** `public/data/settings.json`
- **Hero Section:** `public/data/hero.json`
- **Director Message:** `public/data/director.json`
- **Services:** `public/data/services/*.json`
- **Partners:** `public/data/partners/*.json`
- **Projects:** `public/data/projects/*.json`

### Data Loading System
- **`useDataLoader<T>`**: React hook for loading single JSON files
- **`useMultipleDataLoader<T>`**: React hook for loading multiple JSON files
- **Error Handling**: Comprehensive error handling with loading states
- **Type Safety**: Full TypeScript support for all data structures

## 🔐 Content Management

### Access CMS
1. Go to https://onafricatp.com/admin-login
2. Log in with authorized credentials
3. Access admin panel at https://onafricatp.com/admin/

### Publishing Workflow
1. **Edit Content:** Make changes in CMS
2. **Save as Draft:** Content saved as draft
3. **Review:** Review changes in editorial workflow
4. **Publish:** Publish to make changes live
5. **Auto-Deploy:** Site rebuilds automatically

### Content Types
- **Settings:** Company information and contact details
- **Hero Section:** Homepage content and statistics
- **Director Message:** Director's message and photos
- **Services:** Company services with descriptions and images
- **Projects:** Portfolio of completed projects
- **Partners:** Business partners and collaborations

## 📞 Contact

- **Téléphone:** +222 28880729
- **WhatsApp:** +34 666 39 63 36
- **Email:** salesonafrica@onafricatp.com
- **Adresse:** Nouakchott, Mauritanie
- **BP:** 06992

## 🔗 Links

- **Website:** https://onafricatp.com
- **GitHub:** https://github.com/brahimmedta/ON-AFRICA-TP11
- **Admin Panel:** https://onafricatp.com/admin/

---

© 2025 ON AFRICA TP. All rights reserved.