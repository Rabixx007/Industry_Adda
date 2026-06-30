
```
Industry_Adda
├─ .vercelignore
├─ docker-compose.yml
├─ frontend
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ SETUP_COMPLETE.md
│  ├─ src
│  │  ├─ App.jsx
│  │  ├─ components
│  │  │  ├─ AnimatedBg.jsx
│  │  │  ├─ Auth.jsx
│  │  │  ├─ Dashboard.jsx
│  │  │  ├─ Feed.jsx
│  │  │  ├─ Messaging.jsx
│  │  │  ├─ Navbar.jsx
│  │  │  ├─ Profile.jsx
│  │  │  ├─ ProjectBoard.jsx
│  │  │  ├─ Search.jsx
│  │  │  └─ TinderMatch.jsx
│  │  ├─ data
│  │  │  └─ dummy.js
│  │  ├─ main.jsx
│  │  └─ styles.css
│  ├─ vercel.json
│  └─ vite.config.js
├─ gateway
│  └─ nginx.conf
├─ README.md
└─ services
   ├─ core
   │  ├─ Dockerfile
   │  ├─ package-lock.json
   │  ├─ package.json
   │  ├─ src
   │  │  ├─ config
   │  │  │  ├─ db.ts
   │  │  │  ├─ redis.ts
   │  │  │  └─ schema.ts
   │  │  ├─ controllers
   │  │  │  ├─ auth.controller.ts
   │  │  │  ├─ post.controller.ts
   │  │  │  ├─ project.controller.ts
   │  │  │  ├─ search.controller.ts
   │  │  │  └─ user.controller.ts
   │  │  ├─ index.ts
   │  │  ├─ middleware
   │  │  │  └─ auth.ts
   │  │  ├─ models
   │  │  └─ routes
   │  │     ├─ auth.routes.ts
   │  │     ├─ post.routes.ts
   │  │     ├─ project.routes.ts
   │  │     ├─ search.routes.ts
   │  │     └─ user.routes.ts
   │  └─ tsconfig.json
   ├─ match
   │  ├─ Dockerfile
   │  ├─ package-lock.json
   │  ├─ package.json
   │  ├─ src
   │  │  ├─ config
   │  │  │  └─ db.ts
   │  │  ├─ controllers
   │  │  │  └─ match.controller.ts
   │  │  ├─ index.js
   │  │  ├─ index.ts
   │  │  └─ middleware
   │  │     └─ auth.ts
   │  └─ tsconfig.json
   └─ messaging
      ├─ Dockerfile
      ├─ package-lock.json
      ├─ package.json
      ├─ src
      │  ├─ config
      │  │  ├─ db.ts
      │  │  └─ redis.ts
      │  ├─ controllers
      │  │  └─ message.controller.ts
      │  ├─ index.ts
      │  └─ middleware
      │     └─ auth.ts
      └─ tsconfig.json

```