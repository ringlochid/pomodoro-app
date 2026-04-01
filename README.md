# Pomodoro App

A responsive Pomodoro timer built with React, TypeScript, and Vite from a Figma design in roughly 8 hours.

This project was a front-end implementation exercise focused on translating a polished design into a working app with clean component structure, reusable UI, and simple state management. I didn’t run into any major blockers while building it, which made it a good project for practicing execution, consistency, and attention to detail.

## Preview

![Pomodoro App Preview](./preview.jpg)

## Features

- Switch between **Pomodoro**, **Short Break**, and **Long Break** modes
- **Start**, **pause**, **resume**, and **restart** the timer
- Circular **progress ring** that updates as time passes
- Settings modal for changing:
  - pomodoro duration
  - short break duration
  - long break duration
  - font theme
  - accent color
- Responsive layout based on the original design
- Dynamic visual theme changes based on selected settings

## Built With

- React
- TypeScript
- Vite
- Tailwind CSS
- Context API
- `useReducer`

## What I Practiced

This project helped me reinforce a few core front-end skills:

- turning a Figma design into a responsive interface
- structuring a small app into reusable components
- managing global timer and settings state with Context + `useReducer`
- handling countdown logic with React hooks and effects
- applying style changes dynamically through app settings

## Project Structure

```bash
src/
  components/
  contexts/
  hooks/
```

- `components/` – layout sections, timer UI, and settings modal
- `contexts/` – shared state definitions for timer and settings
- `hooks/` – custom hooks for reading and syncing app state

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Notes

I built this project as a focused front-end practice challenge. The goal wasn’t to solve a particularly complex problem, but to build a clean and complete product from design to implementation in a short amount of time.

Because the build process was fairly smooth, the main value of this project was in practicing UI accuracy, component organization, and state flow rather than debugging difficult issues. It was a good reminder that not every project needs a dramatic challenge to still be worth documenting.

## Future Improvements

- persist settings with `localStorage`
- add sound or browser notifications when a session ends
- improve keyboard accessibility and focus states
- add automatic switching between focus and break sessions
- include session history or simple productivity stats
