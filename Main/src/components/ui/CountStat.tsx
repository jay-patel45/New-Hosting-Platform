import { useEffect, useState } from "react";
import { useInView } from "../../hooks/useInView";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

export function CountStat({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  label,
  source,
  href,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  source: string;
  href: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const reduced = usePrefersReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView && !reduced) return;

    if (reduced || typeof window === "undefined") {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const totalFrames = 48;
    const tick = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) window.requestAnimationFrame(tick);
    };

    const request = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(request);
  }, [inView, reduced, value]);

  const number = decimals
    ? display.toFixed(decimals)
    : Math.round(display).toLocaleString("en-IN");

  return (
    <div className="rounded-lg border border-white/15 bg-white/10 p-4 text-white shadow-glow backdrop-blur md:p-5">
      <div className="text-3xl font-bold tracking-normal md:text-4xl">
        {prefix}
        <span ref={ref}>{number}</span>
        {suffix}
      </div>
      <div className="mt-1 text-sm font-medium text-white/82">{label}</div>
      <a
        href={href}
        className="mt-3 block text-[11px] leading-snug text-white/55 underline-offset-4 hover:text-white hover:underline"
      >
        Source: {source}
      </a>
    </div>
  );
}
