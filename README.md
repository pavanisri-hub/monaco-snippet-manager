# 🚀 Snippet Manager

A modern, feature-rich **Code Snippet Management Application** built with React, Vite, Zustand, Monaco Editor, and Tailwind CSS. This app enables developers to efficiently create, organize, search, and share code snippets with seamless GitHub Gist integration and persistent local storage.

---

## ✨ Key Highlights

* ⚡ Fast & lightweight (powered by Vite)
* 🧠 Smart state management using Zustand
* 💻 VS Code-like editing experience (Monaco Editor)
* ☁️ GitHub Gist integration (import/export)
* 💾 Local storage persistence
* 🐳 Docker support for easy deployment

---

## 📌 Features

### 📝 Snippet Management

* Create, edit, and delete snippets
* Add title, programming language, tags, and code
* Organize snippets efficiently

### 🔍 Search & Filtering

* Live search by title, tags, or content
* Tag-based filtering with one click

### 💻 Code Editor

* Monaco Editor (same as VS Code)
* Syntax highlighting for multiple languages
* Light/Dark theme support

### 🔗 Sharing & Backup

* Share snippets via unique routes
* Copy code to clipboard instantly
* Backup all snippets as JSON
* Restore from backup file

### ☁️ GitHub Integration

* Import public GitHub Gists
* Export snippets as Gists (requires token)

### 🐳 DevOps Ready

* Fully containerized using Docker
* One-command deployment with Docker Compose

---

## 🏗️ Project Architecture

This project follows a **modular and scalable frontend architecture**:

* **Component-Based Design** → Reusable UI components
* **Separation of Concerns** → Services, hooks, store separated
* **Centralized State** → Zustand for predictable state flow
* **Service Layer** → Handles API & localStorage logic

---

## 📂 Folder Structure

```bash
MONACO-SNIPPET-MANAGER/
│
├── node_modules/
├── public/
│
├── src/
│   ├── assets/                # Static assets
│   │
│   ├── components/            # Reusable UI components
│   │   ├── Editorpane.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── constants/             # App constants
│   │   └── storageKeys.ts
│   │
│   ├── hooks/                 # Custom React hooks
│   │   └── useDebouncedValue.ts
│   │
│   ├── layouts/               # Layout wrappers
│   │   └── ShellLayout.tsx
│   │
│   ├── pages/                 # Page-level components
│   │   ├── DashboardPage.tsx
│   │   └── SnippetSharePage.tsx
│   │
│   ├── services/              # API & local storage logic
│   │   ├── githubGistService.ts
│   │   └── localStorageService.ts
│   │
│   ├── store/                 # Zustand state management
│   │   └── snippetStore.ts
│   │
│   ├── types/                 # TypeScript types/interfaces
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── styles
│
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── package.json
├── vite.config.ts
└── README.md
```

---

## 🧠 Architecture Flow

```text
User Action → Component → Zustand Store → Service Layer → (localStorage / GitHub API)
```

* UI interacts with **components**
* Components update **Zustand store**
* Store communicates with **services**
* Services handle **external operations (API/localStorage)**

---

## 🛠️ Tech Stack

| Category   | Technology              |
| ---------- | ----------------------- |
| Frontend   | React, TypeScript, Vite |
| Routing    | React Router            |
| State Mgmt | Zustand                 |
| Editor     | Monaco Editor           |
| Styling    | Tailwind CSS            |
| API        | GitHub Gist API         |
| DevOps     | Docker, Docker Compose  |

---

## ⚙️ Getting Started

### 🔑 Prerequisites

* Node.js (LTS)
* npm / yarn
* Docker (optional)

---

### 📥 Installation

```bash
git clone https://github.com/pavanisri-hub/monaco-snippet-manager.git
cd monaco-snippet-manager
npm install
```

---

### 🔐 Environment Variables

Create `.env.local`:

```env
VITE_GITHUB_TOKEN=your_token_here
```

> Required only for exporting snippets to GitHub Gist.

---

## ▶️ Running the App

### Development

```bash
npm run dev
```

App runs at: [http://localhost:5173](http://localhost:5173)

---

### Production Build

```bash
npm run build
npm run preview
```

---

## 🐳 Docker Setup

### Run with Docker Compose

```bash
docker-compose up --build -d
```

* App runs on: [http://localhost:3000](http://localhost:3000)
* Includes health check using `curl`

---

## 🔄 Core Workflow

### 1. Create Snippet

* Click **New Snippet**
* Enter title, language, tags, and code
* Save snippet

### 2. Storage

* Stored in **localStorage**
* Key: `code_snippets_data`

### 3. Search & Filter

* Real-time search
* Tag-based filtering

### 4. Share

* Share via `/snippets/view/:id`

### 5. Backup

* Export → JSON file
* Import → Restore snippets

---

## 🎨 Theme Support

* Light mode → `vs`
* Dark mode → `vs-dark`
* Preference saved in localStorage

---

## 📈 Future Enhancements

* 🔐 User authentication
* ☁️ Cloud sync (Firebase / Supabase)
* 📱 Mobile responsiveness improvements
* 🧩 Snippet collections/folders
* 🤝 Team collaboration

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a branch
3. Make changes
4. Submit a PR

---

## 📜 License

This project is licensed under the MIT License.

---

## 💡 Author

**Pavani Sri**

---

⭐ If you like this project, consider giving it a star on GitHub!
