import Reveal from "@/components/Reveal";

export default function Vision() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-line bg-mist px-3.5 py-1.5 text-xs font-medium text-muted">
            Our approach
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-7 max-w-4xl font-display text-2xl font-semibold leading-snug text-ink sm:text-4xl">
            The edge in property isn&rsquo;t more staff or more software.{" "}
            <span className="text-muted">
              It&rsquo;s intelligent systems that handle the repetitive work — while
              your people stay in control of every decision.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
