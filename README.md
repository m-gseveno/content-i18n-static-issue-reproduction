# Content & i18n static generation

This repo has the goal to demonstrate the issue of using `nuxt-content` and `nuxt-i18n` issue with static generation
 
## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run generate
```

Locally preview production build:

```bash
npx serve .output/public
```

## Problem

  1. Go to /blog
  2. Visit one of the two articles
  3. Change language to another locale
  4. Change to english
  5. Change language to another locale

At this point the english version should stay and if you keep switching locale you'll never get the good article
This behavior only occur in static mode if you launch in dev or node env you'll not encounter the problem.

