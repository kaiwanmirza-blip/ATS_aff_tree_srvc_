# Supabase setup

## Local environment

Copy `.env.example` to `.env` in the project root and fill in:

```dotenv
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-publishable-or-legacy-anon-key
```

Find the project URL and browser-safe publishable key in your Supabase project's
Connect dialog / API settings. The requested `VITE_SUPABASE_ANON_KEY` variable
accepts either the publishable key or a legacy anon key. Never put a secret or
`service_role` key in a `VITE_` variable: Vite bundles these values into the browser.
Restart `npm run dev` after changing `.env`. Configure the same variables in your
deployment's build environment. `.env` files are ignored; commit `.env.example`
and `package-lock.json`.

## Apply the migration

Run `supabase/migrations/20260301_init_leads.sql` once in the intended project's
Supabase SQL Editor. If using a linked Supabase CLI workflow instead, apply it
through that project's migration tooling. The filename follows the requested
name. Do not reapply it to a database where it has already run.

The migration creates:

- `leads`, with insert-only visitor access and a default `new` status.
- `lead_status_logs`, recording initial status and every status change.
- A private `lead-photos` bucket accepting JPEG, PNG, and WebP up to 10 MiB each.

There are no visitor read, update, or delete policies. Staff access and scheduling
updates must go through the Dashboard or a backend that authorizes staff before
using its server-only credentials. Statuses are `new`, `contacted`, `scheduled`,
`priority_dispatch`, `completed`, and `cancelled`. This records dispatch workflow
status; appointment times, calendars, and staff authentication are not implemented.

## Use from React

```js
import { supabase } from './lib/supabase'; // Adjust to your component's location.

// Retain this ID for photos: insert-only access intentionally returns no row.
const leadId = crypto.randomUUID();
const { error } = await supabase.from('leads').insert({
  id: leadId,
  customer_name: 'Jane Customer',
  phone: '555-555-0100',
  service_type: 'Tree trimming',
  plot_size: '0.5 acres',
  estimated_cost: 350.00,
});
if (error) throw error;

// After a successful lead insert, upload a File selected by the customer.
// Validate the file type and size in the form for useful feedback as well.
const extensions = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const extension = extensions[file.type];
if (!extension) throw new Error('Choose a JPEG, PNG, or WebP image.');
const path = `${leadId}/${crypto.randomUUID()}.${extension}`;
const { error: uploadError } = await supabase.storage
  .from('lead-photos')
  .upload(path, file, { upsert: false, contentType: file.type });
if (uploadError) throw uploadError;
```

Do not append `.select()` to the insert; visitors cannot read lead records.
Treat estimates as untrusted customer input. Phone is text to preserve country
codes, plus signs, and leading zeros. `plot_size` is a descriptive string;
`estimated_cost` is an optional nonnegative USD amount.

Photo-to-lead association uses the folder path convention above; the database
does not enforce that association. Trusted staff code can list that prefix and
issue short-lived signed download URLs. A public URL will not serve private files.
Lead creation and uploads are separate operations: retain the lead ID on upload
failure so the user can retry without creating another lead. Deleting a lead
does not remove Storage files; cleanup must use the Storage API.

Public intake allows anyone with the browser key to submit leads and upload
files. For production abuse protection, put CAPTCHA and rate limiting in a
trusted intake endpoint, then replace direct visitor insert/upload policies with
server-side insertion and signed upload URLs. A random folder name is not proof
of ownership. The migration assumes a new ATS project; review existing permissive
policies if integrating into a shared Supabase project.

The estimate form in `src/App.jsx` uses this lead and photo flow when both Vite variables are configured. With either variable missing, the form runs in demo mode and does not send requests or photos. Staff dispatch still uses the Dashboard or a trusted backend.
