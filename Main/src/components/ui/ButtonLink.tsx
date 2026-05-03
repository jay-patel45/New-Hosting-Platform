import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon: Icon,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light" | "outline";
  icon?: LucideIcon;
}) {
  const base =
    "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-saffron/30";
  const variants = {
    primary: "bg-saffron text-white shadow-glow hover:bg-[#e85f00]",
    light: "bg-white text-navy hover:bg-white/90",
    outline:
      "border border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10",
  };

  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : null}
      <span>{children}</span>
    </a>
  );
}
