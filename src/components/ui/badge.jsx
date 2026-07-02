import * as React from "react";

import { cn } from "../../lib/utils";

const badgeVariants = {
  default: "border-transparent bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200",
  secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700",
  outline: "border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300",
  destructive: "border-transparent bg-rose-600 text-white hover:bg-rose-700",
};

function Badge({ className, variant = "default", ...props }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] transition-colors",
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };