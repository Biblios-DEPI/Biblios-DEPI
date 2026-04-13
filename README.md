# Biblios-DEPI 📚

[![Playwright Tests](https://github.com/Biblios-DEPI/Biblios-DEPI/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/Biblios-DEPI/Biblios-DEPI/actions/workflows/playwright.yml?query=branch%3Amain)

**Biblios-DEPI** is a modern book e-commerce platform built with **React** and **Vite**, powered by **Firebase** for backend services.  
This project was developed as part of the **Digital Egyptian Pioneers Initiative (DEPI)** to showcase scalable, maintainable full-stack web development.

The application is live and ready to be tested at: [https://lnkd.in/g2GAg4ie](https://lnkd.in/g2GAg4ie)

You can create your own profile to explore the full functionality or use the trial accounts below to see how the ecosystem handles established user data:

| Email                  | Password        |
|------------------------|----------------|
| beshoy@biblios.com     | beshoyfomail   |
| ebrahem@biblios.com    | ebrahemhassan  |

---

## Features

- Browse and search books efficiently
- Add books to a personal collection or shopping cart
- Responsive design for desktop and mobile devices
- Firebase authentication, database, and hosting integration
- Full-stack design suitable for production-level deployments

---

## Tech Stack

- **Frontend:** React, Vite  
- **Backend / Database:** Firebase (Firestore, Auth, Hosting)  
- **Styling:** CSS / custom styles  
- **Code Quality:** ESLint  
- **Version Control:** Git / GitHub  

---

## Getting Started

### Prerequisites
- Node.js >= 18  
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Biblios-DEPI/Biblios-DEPI.git
cd Biblios-DEPI

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## QA Testing

This project includes comprehensive **end-to-end tests** built with **Playwright**, covering critical user journeys across authentication, catalog browsing, cart operations, wishlist management, and user profiles.

### Test Coverage

**5 test suites with 8 automated tests:**
- `auth.spec.js` — Login and logout flows (2 tests)
- `catalog.spec.js` — Book search and details page navigation (2 tests)
- `cart.spec.js` — Add to cart, update quantity, remove items (3 tests)
- `wishlist.spec.js` — Guest access guard and wishlist toggle when logged-in (2 tests)
- `profile-view.spec.js` — Profile page access and data verification (1 test)

**Test Scope:** Currently covers read-only user operations. Profile editing is not yet implemented in the app.

### Running Tests Locally

```bash
# Run all tests
npm run test:e2e

# Run tests in interactive UI mode (recommended for debugging)
npm run test:e2e:ui

# Run tests in headed mode (see browser automation)
npm run test:e2e -- --headed

# Run a specific test file
npx playwright test tests/auth.spec.js

# View the HTML report from the last test run
npm run test:e2e:report
```

### CI/CD Pipeline

Tests automatically run on every **push** and **pull request** to `main` or `master` branches via GitHub Actions. The HTML test report is uploaded and retained for 30 days.

Check the **Actions** tab in the repository to view test results and reports.

### Test Account

Use this account to manually test authenticated features:
- **Email:** beshoy@biblios.com
- **Password:** beshoyfomail

---

## Start development server
npm run dev
