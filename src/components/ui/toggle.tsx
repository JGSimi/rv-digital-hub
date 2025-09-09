import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"

import { cn } from "@/lib/utils"

// Toggle variant and size types for TypeScript
type ToggleVariant = "default" | "outline"
type ToggleSize = "default" | "sm" | "lg"

// Helper function to generate toggle classes
const getToggleClasses = (variant: ToggleVariant = "default", size: ToggleSize = "default") => {
  const baseClasses = "toggle"
  const variantClass = `toggle--${variant}`
  const sizeClass = `toggle--${size === "default" ? "default-size" : size}`
  
  return cn(baseClasses, variantClass, sizeClass)
}

export interface ToggleProps extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
  variant?: ToggleVariant
  size?: ToggleSize
}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant = "default", size = "default", ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(getToggleClasses(variant, size), className)}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle }
