import * as Headless from "@headlessui/react"
import { clsx } from "clsx"
import { Link } from "./Link"
import React from "react"

const variants = {
  primary: clsx(
    "inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]",
    "rounded-full border border-transparent bg-orange-500 shadow-md",
    "whitespace-nowrap text-base font-medium text-white",
    "transition-colors duration-200 ease-in-out", // Add transition for smoother hover effect
    "data-[disabled]:bg-gray-950 hover:bg-orange-500/90 data-[disabled]:opacity-40",
    "focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2", // Improve focus styles for accessibility
  ),
  secondary: clsx(
    "relative inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]",
    "rounded-full border border-transparent bg-neutral-950/90 shadow-md ring-1 ring-[#D15052]/15",
    "after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d]",
    "whitespace-nowrap text-base font-medium text-white",
    "transition-colors duration-200 ease-in-out", // Add transition for smoother hover effect
    "data-[disabled]:bg-deepNavyBlue/15 hover:bg-deepNavyBlue/20 data-[disabled]:opacity-40",
    "focus:outline-none focus:ring-2 focus:ring-deepNavyBlue focus:ring-offset-2", // Improve focus styles for accessibility
  ),
  outline: clsx(
    "inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]",
    "rounded-full border border-transparent bg-coolGreen shadow-md ring-1 ring-black/10",
    "whitespace-nowrap text-sm font-medium text-white",
    "transition-colors duration-200 ease-in-out", // Add transition for smoother hover effect
    "data-[disabled]:bg-transparent hover:bg-coolGreen/90 data-[disabled]:opacity-40",
    "focus:outline-none focus:ring-2 focus:ring-coolGreen focus:ring-offset-2", // Improve focus styles for accessibility
  ),
}

type ButtonProps = {
  variant?: keyof typeof variants
  children: React.ReactNode // Explicitly type children
} & (
  | (React.ComponentPropsWithoutRef<typeof Link> & { href: string }) // Ensure href is required for Link
  | (Omit<Headless.ButtonProps, "children"> & { href?: undefined })
)

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  { variant = "primary", className, children, ...props },
  ref,
) {
  const buttonClassName = clsx(className, variants[variant])

  if ("href" in props && props.href !== undefined) {
    return (
      <Link {...props} className={buttonClassName} ref={ref as React.Ref<HTMLAnchorElement>}>
        {children}
      </Link>
    )
  }

  return (
    <Headless.Button {...props} className={buttonClassName} ref={ref as React.Ref<HTMLButtonElement>}>
      {children}
    </Headless.Button>
  )
})

Button.displayName = "Button" // Add display name for better debugging
