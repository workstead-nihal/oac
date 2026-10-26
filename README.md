# Odisha Anime Community

React, TypeScript and Vite website for OAC.

## Development

## Shareable links page

`https://joinoac.in/links` opens a standalone community link hub, suitable for
social bios and QR codes. GitHub Pages redirects the address to `/links/`.
Edit destinations and labels in `public/links/index.html`; Vite copies it
unchanged into `dist/links/index.html`. It needs no JavaScript to display links.
The page is public to anyone with its URL, but is not linked in website menus
or included in a sitemap, and requests search engines not to index it.
After building, check that `dist/links/index.html` exists and test its tickets,
Instagram, WhatsApp, Discord and homepage buttons on a phone.

## Local setup

1. Install Node.js 22 or later.
2. Run `npm ci`.
3. Copy `.env.example` to `.env` and fill in `VITE_FORMS_ENDPOINT` with your Cloudflare Worker `/submit` URL.
4. Follow [form setup](integrations/google-sheets/README.md) to configure the Worker and Google Sheet.
5. Run `npm run dev`.

The site can load without a forms endpoint, but submissions require a configured Worker.

## Google Sheets sync

See [activation steps](integrations/google-sheets/README.md) to save
submissions into one spreadsheet with Members, Partners, Stalls, and Creators tabs.
Member applications require a phone number.

## Checks and production build

Run `npm run lint`, `npm run typecheck`, and `npm run build`.
Run `npm run preview` to preview the production build locally.

## Upcoming event updates

## Daily quest and PR integration

The daily trivia launcher is implemented in `src/components/QuestPopup.tsx`.
It remembers completion in this browser's local storage, and remains usable
when storage is blocked. Gallery's creator invitation opens the existing
application menu. During PR #1 conflict resolution, the current event details,
Fydo ticket links, opaque mobile menu and removed hero scroll indicator were
preserved. The PR's obsolete event copy and character scroll artwork were not
restored. No dependencies were added. Test the quest answer and close buttons,
reload after completing it, and check the gallery invitation and mobile menu.

Halloween Party is on 31 October 2026, 4:00 PM–6:30 PM IST, at The Space,
Patia. Its Book Tickets button uses the event's `ticketUrl` and opens the Fydo
booking page in a new tab. Update that URL in `src/components/Events.tsx` when
the organiser changes ticket platforms. Get Involved remains a separate action.

The mobile menu uses a solid dark background, locks background page scrolling
while open, and scrolls within the available screen height on short phones.
The hero's decorative Scroll button is removed on all screen sizes; Discover
More still takes visitors to About. Test the menu at 360px width, both at the
top and after scrolling: content behind it must not show through, menu links
must remain reachable, and closing the menu must restore page scrolling.

Event cards live in `src/components/Events.tsx`. OTAKU COMMUNITY DAY 2026 is
scheduled for 22 November 2026, 12:00 pm–5:00 pm IST, at 3rd Space, Near
Esplanade, Rasulgarh. Its Book Now button opens
https://greet.fydo.in/otaku-community-day-2026/buy-page in a new tab.
Its Get Involved button still
opens the existing community involvement form; this is separate from ticket sales.

Sketch & Sip Meetup and Gaming Tournament Night have `inactive: true`.
Their cards use grey styling and an explicit Inactive label, and hide old
schedule details and involvement buttons. Remove the flag only when the team
confirms that the event is active again.

Run `npm run dev`, then open the local URL printed in the terminal and choose
Events. Check all four cards at phone and desktop widths. Confirm the flagship
date, time, venue and booking link, and that both inactive cards have no buttons.
