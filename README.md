# Extrovate Solutions LLP frontend

Next.js website with MongoDB-backed property listings, inquiry forms, and inquiry email notifications. Newsletter signup is currently disabled.

## Local setup

1. Use Node.js 22 and run `npm ci`.
2. Copy `.env.example` to `.env.local` and enter your own credentials. Never commit `.env.local`.
3. Use a MongoDB deployment that supports transactions, because inquiry creation and notification scheduling use one transaction.
4. Run `npm run dev` and open http://localhost:3000.

Run `npm run lint`, `npx tsc --noEmit --incremental false`, and `npm run build` before deployment.

## Operations

The public property endpoints support reading. Creating, updating, and deleting properties require an `Authorization: Bearer <ADMIN_API_TOKEN>` header. Keep the token server-side; do not place it in browser code. The property payload is validated by `src/lib/property-schema.ts`.

An inquiry is stored with an outbox event. Configure SMTP and schedule `POST /api/internal/process-outbox` with `Authorization: Bearer <CRON_SECRET>` to send notifications. Keep the cron secret server-side. Failed inquiry notifications retry with backoff and stop after five attempts; review failed outbox records operationally. The inquiry API confirms receipt once data is saved, even if email delivery is later delayed.

Set `NEXT_PUBLIC_SITE_URL` to the production origin for canonical URLs and the sitemap. Provide verified public business details through the optional `NEXT_PUBLIC_*` settings. Approved testimonials, leadership, and milestones can be added to `src/lib/approved-content.ts`.

## Data maintenance

Existing property documents created before `cityKey` was introduced need that key populated with their lowercase city. Validate and migrate old feature records before relying on filters. The application does not currently provide an admin UI or migration command.

Newsletter routes and forms are disabled. Existing subscription records, if any, are not altered by this code change.

## Homepage content

The homepage search submits location, property type, and INR budget filters to `/projects`. Featured properties populate the image carousel when the database contains them; otherwise it shows clearly labelled design imagery instead of fictional listings. The testimonial carousel uses visibly labelled sample content until approved quotes are added to `src/lib/approved-content.ts`.
