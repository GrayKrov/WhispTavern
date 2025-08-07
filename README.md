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
├── public/
│ └── index.html # Base HTML template
│
├── src/
│ ├── assets/
│ │ ├── avatars/ # Community avatars (e.g. Krov.jpg)
│ │ ├── images/ # General images (e.g. BannerTop.jpg)
│ │ ├── logos/ # Logos for creators (e.g. krov-logo.png)
│ │ └── styles/ # SCSS modules and global styles
│ │ ├── _vars.scss # Color, spacing, type, breakpoints
│ │ ├── _mixins.scss # Reusable mixins (respond, flex-center, transition)
│ │ ├── _functions.scss # Utility functions (strip-unit, rem)
│ │ ├── main.scss # Global resets & base typography
│ │ ├── community.scss # Community page overrides
│ │ └── creators/ # Per-creator style folders
│ │ └── krov/
│ │ └── creatorkrov.scss # Krov’s custom navbar, footer, layout
│ │
│ ├── components/ # Shared UI components
│ │ ├── BackToTop.vue # “Back to Top” button
│ │ └── CommunityBanner.vue # Banner for Community page
│ │
│ ├── features/
│ │ ├── community/
│ │ │ ├── CommunityCard.vue # Single creator card
│ │ │ └── CommunityList.vue # Grid of CommunityCards
│ │ │
│ │ ├── creators/
│ │ │ └── krov/
│ │ │ ├── KrovNavBar.vue # Krov-specific navbar overrides
│ │ │ └── KrovFooter.vue # Krov-specific footer overrides
│ │ │
│ │ ├── layout/
│ │ │ ├── AppLayout.vue # Wraps each “main” page with navbar, footer, back-to-top
│ │ │ └── Footer.vue # Default footer (theme aware)
│ │ │
│ │ └── navigation/
│ │ └── NavBar.vue # Default navbar (theme aware)
│ │
│ ├── pages/ # Vue Router views
│ │ ├── Home.vue # Landing page
│ │ ├── Community.vue # Community directory page
│ │ └── creator/ # Creator-specific pages
│ │ └── CreatorKrov.vue # Krov’s creator page
│ │
│ ├── router/
│ │ └── index.js # Vue Router setup & route-level meta
│ │
│ ├── App.vue # Root component
│ └── main.js # Application entry point
│
├── package.json # Dependencies & scripts
└── README.md # This file
```

🛠️ Technologies & Architecture
Vue 3 + Composition API (<script setup>)

Vue Router for client-side routing

SCSS Modules with @use for variables, mixins, functions

Dynamic theming for creator pages via route meta fields

Fetch GitHub API for “Recent Work” sections on creator pages

✨ Customization
To add a new creator, create:

src/assets/styles/creators/<name>/<name>.scss

src/features/creators/<name>/<Name>NavBar.vue and ...Footer.vue

src/pages/creator/Creator<Name>.vue, import your custom navbar/footer and SCSS.

Add a route entry in src/router/index.js with meta: { creator: '<name>' } for theme injection.
