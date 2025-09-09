import * as React from "react"

import { cn } from "@/lib/utils"

// Badge variant types for TypeScript
type BadgeVariant = "default" | "secondary" | "destructive" | "outline"

// Helper function to generate badge classes
const getBadgeClasses = (variant: BadgeVariant = "default") => {
  const baseClasses = "badge"
  const variantClass = `badge--${variant}`
  
  return cn(baseClasses, variantClass)
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div className={cn(getBadgeClasses(variant), className)} {...props} />
  )
}

export { Badge }
