<div align="center">

<img src="public/logo.png" alt="Biblios Logo" width="80" />

# 📚 Biblios

**A modern book e-commerce platform — where heritage meets digital reading**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Biblios-c9a84c?style=for-the-badge&labelColor=1a1a2e)](https://biblios-depi.web.app)
[![Playwright Tests](https://img.shields.io/badge/Playwright_Tests-E2E_Ready-2ecc71?style=for-the-badge&labelColor=1a1a2e)](https://github.com/Biblios-DEPI/Biblios-DEPI/actions/workflows/playwright.yml?query=branch%3Amain)
[![Manual QA](https://img.shields.io/badge/📋_Manual_QA-View_Report-3498db?style=for-the-badge&labelColor=1a1a2e)](https://docs.google.com/spreadsheets/d/1dN1oieAIJMsv4eJQ32pApGuFKSRkH0Un/edit?usp=sharing)

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=flat-square&logo=firebase)
![Playwright](https://img.shields.io/badge/Playwright-1.59-2ECC71?style=flat-square&logo=playwright)

*Built as part of the **Digital Egyptian Pioneers Initiative (DEPI)***

</div>

---

## 📖 Overview

**Biblios** tackles the modern problem of disengagement from reading by bringing digital formats, audiobooks, and physical book copies into a single, personalized shopping experience. It makes discovering and owning books feel as natural as browsing a great library.

Built with **React + Vite** on the frontend and powered by **Firebase** for authentication, Firestore data persistence, and hosting — every user's cart, wishlist, and profile are synchronized and preserved across sessions in real time.

---

## ✨ Features

### User Experience
- 🔍 Smart book search and full catalog browsing
- 🛒 Persistent shopping cart with quantity controls
- ❤️ Personal wishlist with auth-gated access
- 👤 User profiles backed by Firestore
- 🎠 Swiper-powered book carousels and featured sections
- 🔔 Toast notifications for all user actions

### Engineering
- 🔐 Firebase Authentication with protected routing
- ♻️ Context API + LocalStorage state synchronization
- 📱 Fully responsive — desktop and mobile
- ⚡ Vite 7 fast development builds and HMR
- 🧪 Two-layer QA: Playwright E2E + manual test suite
- 🚀 CI/CD via GitHub Actions on every push

---

## 🛠 Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend Framework | React | 19 |
| Build Tool | Vite | 7 |
| Routing | React Router DOM | 7 |
| Backend & Auth | Firebase (Firestore + Auth + Hosting) | 12 |
| UI Carousel | Swiper | 12 |
| Notifications | react-hot-toast | 2.6 |
| Linting | ESLint | 9 |
| E2E Testing | Playwright | 1.59 |
| CI/CD | GitHub Actions | — |

---

## 📁 Project Structure

```
Biblios-DEPI/
├── public/                     # Static assets (logo, favicon, images)
├── src/
│   ├── assets/                 # Images and static resources
│   ├── components/             # Reusable UI components
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── BookCard/
│   │   ├── CartItem/
│   │   └── ...
│   ├── context/                # React Context providers
│   │   ├── AuthContext.jsx     # Firebase auth state
│   │   └── CartContext.jsx     # Cart + wishlist state
│   ├── pages/                  # Route-level page components
│   │   ├── Home/
│   │   ├── Catalog/
│   │   ├── BookDetail/
│   │   ├── Cart/
│   │   ├── Wishlist/
│   │   ├── Profile/
│   │   ├── Login/
│   │   └── Register/
│   ├── firebase/               # Firebase config and service helpers
│   │   └── config.js
│   ├── App.jsx                 # Root component + router setup
│   └── main.jsx                # Entry point
├── tests/                      # Playwright E2E test suites
│   ├── auth.spec.js
│   ├── catalog.spec.js
│   ├── cart.spec.js
│   ├── wishlist.spec.js
│   └── profile-view.spec.js
├── .github/workflows/          # GitHub Actions CI pipeline
├── .firebaserc                 # Firebase project config
├── firebase.json               # Firebase hosting config
├── playwright.config.js        # Playwright configuration
├── vite.config.js              # Vite configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 18`
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/Biblios-DEPI/Biblios-DEPI.git
cd Biblios-DEPI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a `.env` file in the project root with your Firebase project credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> The live deployment uses the Biblios Firebase project. For local development, create your own Firebase project at [console.firebase.google.com](https://console.firebase.google.com), enable **Authentication** (Email/Password) and **Firestore**.

### 4. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🌐 Live Demo

> **[→ Open Biblios](https://biblios-depi.web.app)**

Create your own account to explore the full experience, or use the trial credentials below to interact with established user data:

| Email | Password | Notes |
|---|---|---|
| beshoy@biblios.com | beshoyfomail | Has cart & wishlist items |
| ebrahem@biblios.com | ebrahemhassan | Alternative account |

---

## 🧪 Testing

Biblios uses a **two-layer QA strategy** covering all critical user flows.

### Layer 1 — Manual Test Suite

A structured test plan was executed across authentication, catalog browsing, cart operations, wishlist management, profile access, and cross-flow navigation.

> 📋 **[View Full Manual QA Report](https://docs.google.com/spreadsheets/d/1dN1oieAIJMsv4eJQ32pApGuFKSRkH0Un/edit?usp=sharing)**

---

### Layer 2 — Automated E2E Tests (Playwright)

**5 suites · 10 automated tests** — runs on every push via GitHub Actions.

| Suite | Coverage | Tests |
|---|---|---|
| `auth.spec.js` | Login and logout flows | 2 |
| `catalog.spec.js` | Book search and details page navigation | 2 |
| `cart.spec.js` | Add to cart, update quantity, remove items | 3 |
| `wishlist.spec.js` | Guest access guard + logged-in wishlist toggle | 2 |
| `profile-view.spec.js` | Profile access and user identity verification | 1 |

**Test account:**
```
Email:    beshoy@biblios.com
Password: beshoyfomail
```

#### Running Tests Locally

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all E2E tests
npm run test:e2e

# Interactive UI mode (recommended for debugging)
npm run test:e2e:ui

# Headed mode — watch the browser automate live
npm run test:e2e -- --headed

# Run a specific suite
npx playwright test tests/auth.spec.js

# View the HTML report from the last run
npm run test:e2e:report
```

---

### CI/CD Pipeline

Every push and pull request to `main` triggers the GitHub Actions workflow which:

1. Installs all dependencies and Playwright browsers
2. Executes the full E2E test suite against the app
3. Uploads the Playwright HTML report as a downloadable artifact *(retained 30 days)*

→ **[View live CI results](https://github.com/Biblios-DEPI/Biblios-DEPI/actions)**

---

## 📜 Available Scripts

```bash
npm run dev              # Start development server (localhost:5173)
npm run build            # Production build → dist/
npm run preview          # Preview production build locally
npm run lint             # Run ESLint across the codebase
npm run test:e2e         # Run Playwright E2E tests
npm run test:e2e:ui      # Playwright interactive UI mode
npm run test:e2e:report  # Open last Playwright HTML report
```

---

## 👥 Team

Built with care by three collaborators who share a belief that great software can bring people back to reading.

| Name | Role |
|---|---|
| **Beshoy Fomail Labib** | Frontend Development |
| **Ebrahem Hassan** | Frontend Development |
| **Kareem Hossam Ghorab** | Frontend Development |

---

## 📄 License

This project was built as a capstone for the **Digital Egyptian Pioneers Initiative (DEPI)**. All rights reserved by the Biblios team.

---

<div align="center">

*As peaceful as a library. As powerful as a modern platform.*

</div>
