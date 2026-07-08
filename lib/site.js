// Central site configuration — single place to update contact + booking details.

export const CONTACT_EMAIL = "prism.ai.organization@gmail.com";

// Social profiles (clean canonical URLs — no tracking params).
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/prism-ai-org/",
  instagram: "https://www.instagram.com/prism.ai.organization1",
  facebook: "https://www.facebook.com/share/18jKV1W146/",
};

// Props for any external link that should open in a new tab safely.
export function externalLinkProps(href) {
  return { href, target: "_blank", rel: "noopener noreferrer" };
}

// Founders. Replace name/role/bio/photo/linkedin with the real details once
// supplied. `photo` is a path under /public (e.g. "/team/founder-1.jpg"); leave
// it null to render a neutral initial-based placeholder avatar.
export const TEAM = [
  {
    name: "Founder",
    role: "Co-founder & CEO",
    bio: "Building AI systems that give property teams their time back.",
    photo: null,
    linkedin: SOCIAL_LINKS.linkedin,
  },
  {
    name: "Founder",
    role: "Co-founder & CTO",
    bio: "Turning voice, automation, and data into reliable done-for-you operations.",
    photo: null,
    linkedin: SOCIAL_LINKS.linkedin,
  },
];

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
