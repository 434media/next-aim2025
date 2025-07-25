import * as Headless from "@headlessui/react"
import { clsx } from "clsx"
import { Link } from "./Link"
import React from "react"

const variants = {
  primary: clsx(
    "inline-flex items-center justify-center px-4 py-2",
    "rounded-lg border border-transparent bg-[#548cac] shadow-md",
    "whitespace-nowrap text-base font-medium text-white",
    "transition-colors duration-200 ease-in-out",
    "hover:bg-[#548cac]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#548cac] focus-visible:ring-offset-2",
    "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60",
  ),
  secondary: clsx(
    "inline-flex items-center justify-center px-4 py-2",
    "rounded-lg border border-transparent bg-[#4f4f2c] shadow-md",
    "whitespace-nowrap text-base font-medium text-white",
    "transition-colors duration-200 ease-in-out",
    "hover:bg-[#4f4f2c]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f4f2c] focus-visible:ring-offset-2",
    "disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60",
  ),
  outline: clsx(
    "inline-flex items-center justify-center px-4 py-2",
    "rounded-lg border border-[#101310] bg-transparent",
    "whitespace-nowrap text-base font-medium text-[#101310]",
    "transition-colors duration-200 ease-in-out",
    "hover:bg-[#101310]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#101310] focus-visible:ring-offset-2",
    "disabled:bg-transparent disabled:border-gray-300 disabled:text-gray-300 disabled:cursor-not-allowed disabled:opacity-60",
  ),
}

type ButtonProps = {
  variant?: keyof typeof variants
  children: React.ReactNode
} & (
  | (React.ComponentPropsWithoutRef<typeof Link> & { href: string })
  | (Omit<Headless.ButtonProps, "children"> & { href?: undefined })
)

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(
  { variant = "primary", className, children, ...props },
  ref,
) {
  const buttonClassName = clsx("relative overflow-hidden", variants[variant], className)

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute inset-0 transform transition-transform duration-200 ease-in-out group-hover:scale-105"
        aria-hidden="true"
      />
    </>
  )

  if ("href" in props && props.href !== undefined) {
    return (
      <Link {...props} className={buttonClassName} ref={ref as React.Ref<HTMLAnchorElement>}>
        {content}
      </Link>
    )
  }

  return (
    <Headless.Button {...props} className={buttonClassName} ref={ref as React.Ref<HTMLButtonElement>}>
      {content}
    </Headless.Button>
  )
})

Button.displayName = "Button"

