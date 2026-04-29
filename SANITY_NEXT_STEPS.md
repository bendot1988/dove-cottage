# Sanity Setup: Simple Next Steps

This project now has Sanity installed, but your old Decap CMS is still untouched (backup-safe).

## 1) Create your Sanity project (one-time)

Run:

```bash
npx sanity@latest init
```

Choose:
- **Create new project**
- Name: **dove-cottage-site**
- Dataset: **production**
- Output path: **current folder**

## 2) Add project details to local env

Create a file named `.env` in the project root and paste:

```env
SANITY_STUDIO_PROJECT_ID=your_project_id_here
SANITY_STUDIO_DATASET=production
```

(You can copy `.env.sanity.example` and just fill in the ID.)

## 3) Start Sanity Studio

Run:

```bash
npm run sanity:dev
```

Open the URL it shows (usually `http://localhost:3333`).

## 4) What content is ready

These collections are already modeled with direct fields:
- News
- Events
- Newsletters
- Shops

Singleton pages are temporarily modeled in **Singleton Pages (Migration)** with:
- `pageKey` (which page it is)
- `jsonData` (paste existing JSON during migration)

This keeps migration safe while Decap still works.

## 5) Optional next step (recommended)

Next we can convert each singleton page from JSON blob to fully structured Sanity fields (one-by-one).
That gives a cleaner editor for non-technical updates.
