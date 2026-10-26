# Odisha Anime Community

React, TypeScript and Vite website for OAC.

## Development

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
