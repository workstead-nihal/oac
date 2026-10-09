-- Enforce on new/updated rows while preserving existing submissions.
ALTER TABLE public.join_requests
  ADD CONSTRAINT member_phone_required
  CHECK (form_type <> 'member' OR length(btrim(coalesce(phone, ''))) > 0)
  NOT VALID;
