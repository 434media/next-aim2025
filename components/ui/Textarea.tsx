"use client"

import * as React from "react"
import clsx from "clsx"
import { useMotionTemplate, useMotionValue, motion } from "motion/react"

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  const radius = 100
  const [visible, setVisible] = React.useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
            radial-gradient(
              ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--blue-500),
              transparent 80%
            )
          `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[2px] rounded-lg transition duration-300 group/textarea"
    >
      <textarea
        className={clsx(
          `flex min-h-[80px] w-full border-none bg-gray-50 text-black shadow-input rounded-md px-3 py-2 text-sm
            placeholder:text-neutral-400
            focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400
            disabled:cursor-not-allowed disabled:opacity-50
            group-hover/textarea:shadow-none transition duration-400
            resize-y`,
          className,
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
