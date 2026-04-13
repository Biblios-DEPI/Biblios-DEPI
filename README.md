<div align="center">

<img src="https://img.shields.io/badge/Biblios-%F0%9F%93%9A-2C3E50?style=for-the-badge&labelColor=1a1a2e&color=c9a84c&logoColor=white" alt="Biblios"/>

# 📚 Biblios

### *From the Greek **Biblion** — meaning book.*
#### A modern e-commerce platform where heritage meets the digital reading experience.

<br/>

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Biblios-c9a84c?style=for-the-badge&labelColor=1a1a2e)](https://lnkd.in/g2GAg4ie)
[![Playwright Tests](https://img.shields.io/github/actions/workflow/status/Biblios-DEPI/Biblios-DEPI/playwright.yml?branch=main&style=for-the-badge&label=E2E%20Tests&labelColor=1a1a2e&color=2ecc71)](https://github.com/Biblios-DEPI/Biblios-DEPI/actions/workflows/playwright.yml?query=branch%3Amain)
[![Manual QA](https://img.shields.io/badge/📋_Manual_QA-View_Report-3498db?style=for-the-badge&labelColor=1a1a2e)](https://docs.google.com/spreadsheets/d/1dN1oieAIJMsv4eJQ32pApGuFKSRkH0Un/edit?usp=sharing&ouid=102782543615384713755&rtpof=true&sd=true)

<br/>

---

</div>

## Overview

**Biblios** is a full-stack book e-commerce platform built to tackle the modern problem of disengagement from reading. By bringing digital formats, audiobooks, and physical copies into a single, personalized space, it makes discovering and owning books feel as natural as browsing a great library.

Built with **React + Vite** on the frontend and powered by **Firebase** for authentication, Firestore data persistence, and hosting — every user's cart, wishlist, and profile are synchronized and preserved across sessions.

<br/>

---

## ✦ Features

<table>
<tr>
<td width="50%">

**Core Experience**
- 🔍 &nbsp;Smart book search and catalog browsing
- 🛒 &nbsp;Persistent cart with quantity controls
- ❤️ &nbsp;Personal wishlist with auth-gated access
- 👤 &nbsp;User profiles backed by Firestore

</td>
<td width="50%">

**Engineering**
- 🔐 &nbsp;Firebase Auth with protected routing
- ♻️ &nbsp;Context API + LocalStorage state sync
- 📱 &nbsp;Fully responsive — desktop and mobile
- ⚡ &nbsp;Vite-powered fast development builds

</td>
</tr>
</table>

<br/>

---

## ✦ Tech Stack

<div align="center">

| Layer | Technology |
|:---|:---|
| **Frontend** | React, Vite, React Router |
| **Backend & Auth** | Firebase — Firestore, Authentication, Hosting |
| **Styling** | CSS (custom) |
| **Code Quality** | ESLint |
| **Testing** | Playwright (E2E) · Manual QA |
| **CI/CD** | GitHub Actions |
| **Version Control** | Git / GitHub |

</div>

<br/>

---

## ✦ Getting Started

### Prerequisites
- Node.js `>= 18`
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Biblios-DEPI/Biblios-DEPI.git
cd Biblios-DEPI

# Install dependencies
npm install

# Start the development server
npm run dev
```

<br/>

---

## ✦ Live Demo

> **[→ Open Biblios](https://lnkd.in/g2GAg4ie)**

Create your own account to explore the full experience, or use the trial credentials below to interact with established user data:

<div align="center">

| Email | Password |
|:---|:---|
| beshoy@biblios.com | beshoyfomail |
| ebrahem@biblios.com | ebrahemhassan |

</div>

<br/>

---

## ✦ Testing

Biblios is validated through a two-layer QA strategy covering all critical user journeys end-to-end.

<br/>

### Layer 1 — Manual Test Suite

A structured manual test plan was executed across authentication, catalog browsing, cart operations, wishlist management, profile access, and cross-flow navigation.

> 📋 **[View Full Manual QA Report](https://docs.google.com/spreadsheets/d/1dN1oieAIJMsv4eJQ32pApGuFKSRkH0Un/edit?usp=sharing&ouid=102782543615384713755&rtpof=true&sd=true)**

<br/>

### Layer 2 — Automated E2E Tests (Playwright)

**5 suites · 10 automated tests** running on every code change.

<div align="center">

| Suite | What It Covers | Tests |
|:---|:---|:---:|
| `auth.spec.js` | Login and logout flows | 2 |
| `catalog.spec.js` | Book search and details page navigation | 2 |
| `cart.spec.js` | Add to cart, update quantity, remove items | 3 |
| `wishlist.spec.js` | Guest access guard + logged-in wishlist toggle | 2 |
| `profile-view.spec.js` | Profile access and user identity verification | 1 |

</div>

> **Scope note:** Current coverage targets read-only user operations. Profile editing test coverage is planned for a future release.

<br/>

#### Running Tests Locally

```bash
npm run test:e2e              # Run all tests
npm run test:e2e:ui           # Interactive UI mode (recommended for debugging)
npm run test:e2e -- --headed  # Headed mode — watch the browser automate
npx playwright test tests/auth.spec.js  # Run a specific suite
npm run test:e2e:report       # View the HTML report from the last run
```

#### Test Account

```
Email:    beshoy@biblios.com
Password: beshoyfomail
```

<br/>

### CI/CD Pipeline

Every push and pull request to `main`/`master` triggers the GitHub Actions workflow which:

- Installs all dependencies and Playwright browsers
- Executes the full E2E test suite
- Uploads the Playwright HTML report as an artifact *(retained 30 days)*

See the **[Actions tab](https://github.com/Biblios-DEPI/Biblios-DEPI/actions)** for live results.

<br/>

---

## ✦ Team

<div align="center">

Built with care by three collaborators who share a belief that great software can bring people back to reading.

**Ebrahem Hassan · Beshoy · Kareem Hossam Ghorab**

</div>

<br/>

---

<div align="center">

*As peaceful as a library. As powerful as a modern platform.*

</div>