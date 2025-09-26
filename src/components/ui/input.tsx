import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base styles
        "flex h-auto !text-[18px] py-1.5 w-full rounded-xl border-2 bg-transparent px-3 text-base shadow-sm transition-all outline-none md:text-sm",
        "placeholder:text-muted-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ",

        // Default border
        "border-gray-100 dark:border-gray-700",

        // Focus: premium purple glow
        "focus-visible:border-purple-300 focus-visible:ring-1 focus-visible:ring-purple-300/70 focus-visible:ring-offset-1",

        // Invalid
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",

        className
      )}
      {...props}
    />
  )
}

export { Input }
