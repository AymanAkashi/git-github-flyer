# Git & GitHub Flyer - Next.js

This is a Next.js conversion of the original standalone HTML flyer, prepared for deployment on Vercel.

## Run locally

```bash
npm install
npm run dev
```

`npm run dev` uses normal Next.js hot reload (recommended while developing).
If you want to disable hot reload, use:

```bash
npm run dev:no-hmr
```

## Deploy to Vercel

This app uses `@vercel/postgres` in `app/actions.ts`, so set up Postgres before production use.

1. Push this folder to GitHub/GitLab/Bitbucket.
2. In Vercel, click **Add New Project** and import your repository.
3. Keep framework as **Next.js** (auto-detected), then deploy once.
4. In the same Vercel project, open **Storage** -> **Create Database** -> **Postgres**.
5. Attach the database to your project. Vercel will automatically add DB environment variables.
6. Go to **Project Settings** -> **Environment Variables** and confirm DB vars exist for Production/Preview/Development.
7. Redeploy the project (or trigger a new deployment with a commit) after attaching Postgres.
8. Open the deployed URL and submit the registration dialog to verify inserts.

### Expected environment variables

When Postgres is attached, Vercel usually injects:

- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`
- `POSTGRES_USER`
- `POSTGRES_HOST`
- `POSTGRES_PASSWORD`
- `POSTGRES_DATABASE`

No extra `vercel.json` is required for this project.
