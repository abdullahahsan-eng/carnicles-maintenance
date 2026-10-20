// ===== Edit everything configurable here =====
export const config = {
  // Set an actual launch date/time in India Standard Time, e.g. "2026-12-01T18:00:00+05:30".
  // Leave empty until the launch date is confirmed; the page will show "Launching Soon".
  launchDate: "",
  // Destination opened when the countdown ends. Update if the live site uses another URL.
  liveSiteUrl: "https://carnicleauto.com/",
  status: "UNDER MAINTENANCE" as "UNDER MAINTENANCE" | "COMING SOON",
  social: {
    instagram: "https://www.instagram.com/carnicle.auto/",
    facebook: "", // TODO: add official Facebook page URL. Empty = shown as "Coming soon", not linked.
    youtube: "",  // optional. Empty = hidden.
  },
  // Launch-notification form. Leave "" to hide the form entirely.
  // Set to a real endpoint that accepts POST (e.g. Formspree: https://formspree.io/f/xxxx).
  formEndpoint: "",
};
