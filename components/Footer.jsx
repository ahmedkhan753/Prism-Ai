import Logo from "@/components/Logo";
import { SOCIAL_LINKS, CONTACT_EMAIL, externalLinkProps } from "@/lib/site";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Services", href: "#services" },
      { label: "Packages", href: "#packages" },
      { label: "Compare", href: "#compare" },
      { label: "Book a Demo", href: "#contact" },
    ],
  },
  {
    title: "Social",
    links: [
      { label: "LinkedIn", href: SOCIAL_LINKS.linkedin, external: true },
      { label: "Instagram", href: SOCIAL_LINKS.instagram, external: true },
      { label: "Facebook", href: SOCIAL_LINKS.facebook, external: true },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-container px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5">
              <Logo size={28} />
              <span
                className="font-display text-lg font-semibold text-ink"
                style={{ letterSpacing: "0.14em" }}
              >
                PRISM
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              AI voice agents and automation for real estate and construction teams.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block text-sm font-medium text-ink underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-ink">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      {...(link.external
                        ? externalLinkProps(link.href)
                        : { href: link.href })}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-6 text-sm text-muted">
          <p>&copy; {year} Prism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
