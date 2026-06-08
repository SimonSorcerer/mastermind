# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Type-check (tsc -b) then build
npm run lint      # ESLint
npm run preview   # Preview production build
bun test          # Run unit tests (bun:test)
```

## Tech Stack

- React 19 + TypeScript (strict mode, `noUnusedLocals`/`noUnusedParameters` enforced)
- Vite 7 with React Compiler (babel-plugin-react-compiler)
- Zustand 5 for state management (DevTools middleware enabled)
- Tailwind CSS 4 via Vite plugin
- Bun for running tests (`bun:test` in `src/helpers/symbolHelpers.test.ts`)

## Architecture

The app is a Mastermind code-breaking game using letter symbols (a–i) instead of colored pegs. The player types a guess using keyboard letters, submits with Enter, and receives feedback after each guess:

- **X** = correct symbol in the correct position (Mastermind "black peg")
- **O** = correct symbol in the wrong position (Mastermind "white peg")

State is split into two Zustand stores:

- **`src/store/store.ts`** — game state: `secret`, `currentGuess`, `history`, `activeKeys`
- **`src/store/settingsStore.ts`** — configuration: `symbolCount` (3–8), `symbolVariance` (3–9), `repeatedSymbols`, `wordleMode`
- **`src/store/config.ts`** — centralized constants (min/max bounds, defaults)

Game logic lives in **`src/helpers/symbolHelpers.ts`** as pure functions: `generateSecret`, `evaluateGuess`, `getAllowedSymbols`, `isValidSymbol`.

Keyboard input is captured in **`src/components/board/useBoard.ts`** (a custom hook with a `keydown` listener) which calls store actions. Components consume stores directly via hooks — no prop drilling.

The `Cell` component is shared between the board rows and the on-screen keyboard (rendered smaller in keyboard context).

Settings setters enforce invariants: when `repeatedSymbols` is false, `symbolCount` is clamped to `≤ symbolVariance`.

## Game Settings

- **symbolCount** (3–8): length of the secret code
- **symbolVariance** (3–9): size of the symbol pool (letters a through nth letter)
- **repeatedSymbols**: whether the same letter can appear more than once in the secret
- **wordleMode**: planned "direct feedback" mode — per-cell colored feedback (easier) vs. aggregate X/O counts. **Not yet functional** — setting exists in UI but has no effect on rendering.

## Known Missing Features / Incomplete Work

- **History is intentionally newest-first** — `addToHistory` prepends so the most recent guess is always index 0 and renders at the top
- **Wordle mode feedback**: `wordleMode` setting is wired but `RowResult` and `Cell` don't implement per-cell coloring yet. The intent is green (correct position) / yellow (wrong position) coloring per cell instead of aggregate X/O counts
- **On-screen keyboard has no click handlers** — `Keyboard.tsx` is a visual indicator only
- **`src/store/actions.ts`** is an empty placeholder file
- **`Debug.tsx`** intentionally exposes the secret code — this is fine for a demonstrational project

## Known Bugs

- `store.ts` contains a duplicate `getAllowedSymbols` implementation; the canonical version is in `symbolHelpers.ts`
