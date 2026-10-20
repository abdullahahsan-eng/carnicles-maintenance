// ===== Edit everything configurable here =====
export const config = {
  // ISO date e.g. "2026-12-01T18:00:00Z". Leave "" to show "Launching Soon" (no fake countdown).
  launchDate: "",
  status: "UNDER MAINTENANCE" as "UNDER MAINTENANCE" | "COMING SOON",
  // Official profile links. Empty string = card is shown as "Link coming soon" and is not clickable.
  // Never guess a URL; paste the official profile link only.
  social: {
    instagram: "https://www.instagram.com/carnicle.auto/",
    facebook: "", // TODO: add official Facebook page URL. Empty = shown as "Coming soon", not linked.
    youtube: "",  // optional. Empty = hidden.
  },
  // Featured-car rotation (see src/cars.ts for the catalogue).
  // "weekly": the visitor's browser counts whole weeks since `rotationStart` and picks
  //           catalogue entry (weeks % number-of-cars). It is computed on page load from the
  //           current date, so no redeploy is needed to advance the week. It does NOT fetch
  //           new cars: to add cars you edit src/cars.ts and redeploy.
  // "manual": always show the car whose id equals `manualId`.
  featured: { mode: "weekly" as "weekly" | "manual", manualId: "", rotationStart: "2026-01-05" },
  // Launch-notification form. Leave "" to hide the form entirely.
  // Set to a real endpoint that accepts POST (e.g. Formspree: https://formspree.io/f/xxxx).
  formEndpoint: "",
};
