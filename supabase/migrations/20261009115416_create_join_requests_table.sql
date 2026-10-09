/*
# Create join_requests table for OAC community forms

1. New Tables
- `join_requests`
  - `id` (uuid, primary key)
  - `form_type` (text, not null) — one of: 'member', 'partner', 'stall', 'collab'
  - `name` (text, not null) — full name of the applicant
  - `email` (text, not null) — contact email
  - `phone` (text) — optional phone number
  - `city` (text) — optional city/location
  - `message` (text) — optional additional details or motivation
  - `portfolio_url` (text) — optional link to portfolio (for creator collab)
  - `organization` (text) — optional organization/company name (for partner/sponsor)
  - `stall_type` (text) — optional stall category (for stall setup)
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `join_requests`.
- Allow anon + authenticated to INSERT (public form submissions, no sign-in required).
- No SELECT/UPDATE/DELETE for anon or authenticated — only service role can read/manage submissions.
*/

CREATE TABLE IF NOT EXISTS join_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type text NOT NULL CHECK (form_type IN ('member', 'partner', 'stall', 'collab')),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  city text,
  message text,
  portfolio_url text,
  organization text,
  stall_type text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE join_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_join_requests" ON join_requests;
CREATE POLICY "anon_insert_join_requests"
  ON join_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No SELECT, UPDATE, or DELETE policies — submissions are private to service-role admins.