# OAC forms → Google Sheets

The website sends forms to a Cloudflare Worker, which validates them and forwards them to Apps Script. One spreadsheet stores submissions in Members, Partners, Stalls, and Creators tabs. No Supabase account or database webhook is needed.

## Existing Google setup

Your existing Apps Script deployment is compatible with the Worker. Keep these Script Properties:

- `SPREADSHEET_ID`: `1izPI4aZzXaUOUHXjdduqmi5jvPvlKOkwrKqto8Z7FfQ`
- `WEBHOOK_TOKEN`: the private token created by `setup`

The script must be deployed as a Web app, executing as **Me**, with access **Anyone**. Keep the spreadsheet sharing restricted. `Code.gs` includes no public read endpoint. If you edit the script, update its deployment to a new version.

## Activate the Cloudflare Worker

1. Create a free account at https://dash.cloudflare.com/sign-up. No DNS or domain transfer is required.
2. From the project directory, run `npm run worker:login` and finish the Cloudflare authorization in your browser.
3. Run `npm run worker:deploy`. This publishes the Worker configured in `integrations/cloudflare/wrangler.jsonc`. Copy its `https://oac-forms.<your-account>.workers.dev` URL.
4. Run `npm run worker:token`. Paste `WEBHOOK_TOKEN` from Apps Script's Script Properties when prompted. Wrangler stores it as a Worker secret. Never add this token to the frontend or a `VITE_` variable.
5. In local `.env`, set `VITE_FORMS_ENDPOINT=https://oac-forms.<your-account>.workers.dev/submit`. For local testing, temporarily add `http://127.0.0.1:5173` to `ALLOWED_ORIGINS` in the Worker config and redeploy. Restart Vite after changing `.env`.
6. Submit a disposable test for each form, then verify the correct tab in Google Sheets. Confirm a blank member phone is rejected, failed submissions preserve the fields, and retries do not create duplicate rows. Remove the disposable rows after testing.
7. In GitHub **Settings → Secrets and variables → Actions → Variables**, set `VITE_FORMS_ENDPOINT` to the verified Worker `/submit` URL. Merge the migration branch to `main` to deploy the frontend. The Worker has its own deployment command; frontend pushes do not redeploy it.

The form only shows success after Google confirms a saved row. If Google fails or times out, users can retry with the same submission ID; the script deduplicates that ID. Editing the form before retrying creates a new submission ID.

The Worker limits each IP to five requests per minute and allows the production site origins. This is basic abuse protection, not authentication. If persistent automated spam becomes a problem, add Cloudflare Turnstile.

Google Sheets is now the only submission store. Existing Supabase records are not migrated or deleted; retain/export them separately. The `supabase/migrations` directory is historical and is not used by this integration.

## Import previous members

1. Back up the spreadsheet. Rename the current `Members` tab to `Members Backup` so existing website submissions remain available.
2. Create a new tab named exactly `Members`. Copy the old member table, including its heading row, into cell A1. Preserve phone numbers as text when copying/importing so leading zeros stay intact.
3. The supported old headings are `Timestamp`, `Email Address`, `1. Full Name`, `2. Mobile Number`, and `8. Want to volunteer?`. Leading/trailing spaces and capitalization do not matter. Extra columns such as Instagram, college, age, interests, and referral remain intact.
4. Replace the Google Apps Script editor contents with this repository's `Code.gs`, save, select `setup`, and run it. Keep the existing Script Properties. Setup adds missing `Submission ID`, `Message`, and `City` columns to the right; it preserves historical rows and existing headings.
5. Select **Deploy → Manage deployments → Edit → Version: New version → Deploy** to update the existing web app while keeping its URL. Submit one test member and confirm it appears under the old rows with the volunteering answer in the matching column.

New submissions match columns by heading in `Members`. Social media ID maps to `3. Instagram handle`, City / College or School maps to `4. College/School & Place`, age maps to `5. Age range`, and referral maps to `7. How did you find us?`. City / College or School and age range are required for new members; social media and referral are optional. Interests remain blank for new submissions because the website does not collect them.

If the imported table has no Timestamp column, setup adds `Submitted At`. Setup then moves the entire Submission ID and timestamp columns to positions A and B, preserving their existing values and the relative order of the other columns. Missing social media, age, and referral columns are also added automatically. Historical rows can keep blank submission IDs and timestamps. `Members Backup` is retained separately and is not automatically merged. Partners, Stalls, and Creators retain their existing column order. Redeploy Apps Script before testing the new member fields so their values reach the matching columns.

New member rows store the volunteering answer in its own column; Message contains only the user's optional message. Previously saved messages are unchanged.

## Checks

Run `npm run test:forms`, `npm run lint`, `npm run typecheck`, and `npm run build`.
Run `npm run worker:deploy -- --dry-run` to validate the Worker package without publishing.

References: [Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/), [rate limiting](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/), [Apps Script web apps](https://developers.google.com/apps-script/guides/web).
