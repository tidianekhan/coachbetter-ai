# CoachBetter.ai — Session Evaluation Prototype

A React prototype for AI-powered coaching session evaluation based on EMCC competency standards.

## What it does

Upload a coaching session video → processing simulation → detailed EMCC evaluation report

**Flow:** Upload → Processing (with stage-by-stage progress) → Report (tabbed dashboard)

## Running locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Switching to the real API

In `src/App.js`, change:

```js
const MOCK_MODE = true;   // → false
const API_URL = 'https://your-api-url.com';  // → real endpoint
```

The full API pipeline is already implemented in `realProcessing()`.

## Tech stack

- React 18
- No additional UI libraries
- Google Fonts (DM Serif Display + DM Sans)
- CSS custom properties for theming

## Design decisions

See [CoachBetter_Design_Guide_v2](https://github.com/tidianekhan/coachbetter-ai/blob/main/CoachBetter_Design_Guide_v2.docx) for a full explanation of every design and code choice.
