export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
      {eyebrow ? (
        <p
          className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${
            light ? "text-saffron" : "text-saffron"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`text-3xl font-bold tracking-normal md:text-5xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-4 text-base leading-7 md:text-lg ${
            light ? "text-white/70" : "text-muted"
          }`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
