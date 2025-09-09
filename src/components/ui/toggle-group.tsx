import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"
import { ToggleProps } from "@/components/ui/toggle"

// Helper function to generate toggle classes (same as in toggle.tsx)
const getToggleClasses = (variant: "default" | "outline" = "default", size: "default" | "sm" | "lg" = "default") => {
  const baseClasses = "toggle"
  const variantClass = `toggle--${variant}`
  const sizeClass = `toggle--${size === "default" ? "default-size" : size}`
  
  return cn(baseClasses, variantClass, sizeClass)
}

const ToggleGroupContext = React.createContext<{
  size?: "default" | "sm" | "lg"
  variant?: "default" | "outline"
}>({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
    variant?: "default" | "outline"
    size?: "default" | "sm" | "lg"
  }
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("toggle-group", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & {
    variant?: "default" | "outline"
    size?: "default" | "sm" | "lg"
  }
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        getToggleClasses(
          context.variant || variant,
          context.size || size,
        ),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
