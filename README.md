# WhispTavern

A cozy, fantasy-themed Vue 3 Single-Page Application (SPA) that serves as the official website for the **Whispering Woods Tavern** community. Built with Vue CLI, Vue Router, and SCSS modules, WhispTavern provides:

- A polished **Home** landing page with mission statement
- A **Community** directory featuring community creator cards
- Individual **Creator** pages, each with its own custom navbar, footer, and styling (e.g. Krov’s page)
- Responsive design and theme-aware navigation/footer via Vue Router meta fields

---

## 📂 Project Structure

```Bash

whisptavern/
├─ public/
│  ├─ index.html                     # Base HTML template (preconnect/prefetch)
│  ├─ og-default.jpg                 # Default Open Graph / Twitter share image
│  ├─ robots.txt                     # Basic crawl rules
│  ├─ sitemap.xml                    # Hand-maintained sitemap (update as routes go live)
│  └─ .htaccess                      # (Optional) Apache SPA rewrites for cPanel/Apache
│
├─ scripts/
│  ├─ build-images.cjs               # (Optional) image pipeline helper (AVIF/WebP)
│  └─ validate-content.cjs           # AJV validator for /src/content/*
│
├─ src/
│  ├─ assets/
│  │  ├─ avatars/                    # Community avatars
│  │  │  ├─ Krov.avif
│  │  │  ├─ Krov.jpg
│  │  │  ├─ Krov.webp
│  │  │  ├─ Placeholder.avif
│  │  │  ├─ Placeholder.png
│  │  │  └─ Placeholder.webp
│  │  ├─ images/                     # Shared hero/illustrations
│  │  │  ├─ BannerTop.avif
│  │  │  ├─ BannerTop.jpg
│  │  │  └─ BannerTop.webp
│  │  ├─ logos/
│  │  │  ├─ krov-logo.avif
│  │  │  ├─ krov-logo.png
│  │  │  └─ krov-logo.webp
│  │  ├─ styles/                     # SCSS tokens + globals
│  │  │  ├─ _functions.scss
│  │  │  ├─ _mixins.scss
│  │  │  ├─ _tokens.scss             # Theme tokens (colors, radii, shadows, spacing)
│  │  │  ├─ _vars.scss               # Legacy vars (still imported by components)
│  │  │  ├─ community.scss
│  │  │  ├─ main.scss                # Normalize/base + global typography
│  │  │  └─ creators/
│  │  │     └─ krov/
│  │  │        └─ creatorkrov.scss   # Krov page theming
│  │  └─ banners/                    # (Optional) per-creator hero images
│  │
│  ├─ components/                    # Reusable/shared components
│  │  ├─ AnnouncementsList.vue
│  │  ├─ CommunityBanner.vue
│  │  └─ ui/
│  │     ├─ AvatarRing.vue
│  │     ├─ LinkButton.vue           # Consistent buttons (primary/ghost, <a>/<RouterLink>)
│  │     ├─ SectionHeading.vue       # Section titles (optional lantern glow)
│  │     └─ UiCard.vue               # Simple card wrapper (used selectively)
│  │
│  ├─ content/                       # Versioned data (no CMS)
│  │  ├─ creators.json               # slug, name, avatar, status, links[], blurb, (optional banner)
│  │  ├─ announcements.json          # date, title, body
│  │  └─ schemas/                    # AJV JSON Schemas
│  │     ├─ announcement.schema.json
│  │     └─ creator.schema.json
│  │
│  ├─ features/                      # Feature-scoped components
│  │  ├─ community/
│  │  │  ├─ CommunityCard.vue
│  │  │  └─ CommunityList.vue
│  │  ├─ creators/
│  │  │  └─ krov/
│  │  │     ├─ KrovFooter.vue
│  │  │     ├─ KrovNavBar.vue
│  │  │     └─ ProjectCard.vue
│  │  ├─ layout/
│  │  │  ├─ AppLayout.vue            # Default shell (NavBar + Footer)
│  │  │  └─ Footer.vue               # Default site footer
│  │  └─ navigation/
│  │     └─ NavBar.vue               # Site navbar (+ skip link)
│  │
│  ├─ pages/                         # Router views
│  │  ├─ Home.vue
│  │  ├─ Community.vue
│  │  └─ creator/
│  │     ├─ CreatorKrov.vue          # Bespoke creator page
│  │     └─ CreatorPlaceholder.vue   # Dynamic placeholder for other creators
│  │
│  ├─ router/
│  │  └─ index.js                    # Routes + meta (/:slug → placeholder unless bespoke)
│  │
│  ├─ App.vue                        # Root component
│  └─ main.js                        # App entry, preconnect/prefetch, mount
│
├─ docs/
│  └─ lighthouse.md                  # (Optional) audit notes & fixes
│
├─ .gitignore
├─ babel.config.js                   # (or babel.config.json in your setup)
├─ jsconfig.json
├─ package.json
├─ package-lock.json
├─ README.md
└─ vue.config.js

```

**🛠️ Technologies & Architecture**

Vue 3 + Composition API (<script setup>)

Vue Router for client-side routing

SCSS Modules with @use for variables, mixins, functions

Dynamic theming for creator pages via route meta fields

Fetch GitHub API for “Recent Work” sections on creator pages

**✨ Customization**

To add a new creator, create:

src/assets/styles/creators/<name>/<name>.scss

src/features/creators/<name>/<Name>NavBar.vue and ...Footer.vue

src/pages/creator/Creator<Name>.vue, import your custom navbar/footer and SCSS.

Add a route entry in src/router/index.js with meta: { creator: '<name>' } for theme injection.
