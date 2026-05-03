import type { ReactNode } from "react";

export function SourceLine({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-xs leading-relaxed text-muted">{children}</p>;
}
