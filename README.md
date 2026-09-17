# CookMate

Cook with what you already have. Plain JavaScript + React (.jsx) + Tailwind CSS.

## Project structure

```
src/
  routes/       pages (.jsx)
  components/   shared UI (.jsx)
  data/         recipe list (.js)
  hooks/        React hooks (.js)
  lib/          helpers (.js)
sqlite/
  server.js     local SQLite database server
```

## Run the app

```
npm install
npm run dev
```

## Saved recipes with SQLite (on your own computer)

The saved list can be stored in a real SQLite file. Open a second terminal and run:

```
npm run db
```

This needs Node 22+ (it uses Node's built-in SQLite) and creates `cookmate.db`
in the project folder. While it runs, saving a recipe writes to that file.
If it is not running, the app keeps your saved list in the browser instead,
so the hosted version still works.

## No TypeScript

There is no `tsconfig.json` and no TypeScript packages. Two files still carry a
`.ts` name because build tools generate/own them: `src/routeTree.gen.ts`
(auto-generated page list) — do not edit it by hand.
