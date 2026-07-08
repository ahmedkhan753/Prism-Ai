// Central site configuration — single place to update contact + booking details.

export const CONTACT_EMAIL = "prism.ai.organization@gmail.com";

// Canonical site URL. Update once the final domain is live (also drives
// metadataBase, sitemap, robots, and canonical).
export const SITE_URL = "https://prism-ai.vercel.app";

// Drop a Calendly / scheduling URL here later. While empty, every "Book a Demo"
// CTA simply scrolls to the contact form (#contact).
export const BOOKING_URL = "";

// Props for any "Book a Demo" link. When BOOKING_URL is set it opens the
// scheduler in a new tab; otherwise it scrolls to the contact section.
export function demoLinkProps() {
  if (BOOKING_URL) {
    return { href: BOOKING_URL, target: "_blank", rel: "noopener noreferrer" };
  }
  return { href: "#contact" };
}
