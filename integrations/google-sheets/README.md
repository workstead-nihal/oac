# Google Sheets submission sync

The website saves submissions to Supabase. An INSERT database webhook forwards
each saved submission to one Google spreadsheet with Members, Partners, Stalls,
and Creators tabs. The database remains the source of truth if Google is unavailable.

## Activate

1. Create/import the OAC submissions spreadsheet in the Google account that should own it. Keep its sharing restricted.
2. Open **Extensions → Apps Script**, and paste `Code.gs` into the script editor.
3. In **Project Settings → Script Properties**, set `SPREADSHEET_ID` to the ID from the spreadsheet URL (between `/d/` and `/edit`).
4. Run `setup` once and authorize spreadsheet access. This prepares the four tabs and creates `WEBHOOK_TOKEN` in Script Properties.
5. Choose **Deploy → New deployment → Web app**, execute as **Me**, access **Anyone**. Copy the deployed `/exec` URL. The token protects writes; the script has no public read endpoint. Never put the token in the website, GitHub variables, or source code.
6. In Supabase **Database Webhooks**, create an HTTP webhook for `public.join_requests`, event **INSERT**, method **POST**. Use `<exec URL>?token=<WEBHOOK_TOKEN>` as its URL, JSON content type, and a 10,000 ms timeout. Store this URL only in the backend webhook configuration.
7. Apply `supabase/migrations/20261009190000_require_member_phone.sql` using Supabase SQL Editor. It requires member phone numbers on new/updated records and preserves historical submissions.
8. Submit one disposable test for each form category. Verify each reaches the correct tab, then remove the test rows from Supabase and Sheets. Verify that members cannot submit a blank phone number.

New submissions sync after activation. Existing submissions are not backfilled.
Duplicate deliveries are detected using Submission ID. If delivery fails, the
submission remains in Supabase; inspect webhook logs and replay its INSERT payload.
Do not assume database webhooks automatically retry failed deliveries.

Reference: [Supabase database webhooks](https://supabase.com/docs/guides/database/webhooks),
[Google Apps Script web apps](https://developers.google.com/apps-script/guides/web).
