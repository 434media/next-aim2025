import * as React from "react"

export interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {}

const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        style={{
          border: 0,
          clip: "rect(0 0 0 0)",
          height: "1px",
          margin: "-1px",
          overflow: "hidden",
          padding: 0,
          position: "absolute",
          width: "1px",
          whiteSpace: "nowrap",
          wordWrap: "normal",
        }}
        {...props}
      >
        {children}
      </span>
    )
  },
)

VisuallyHidden.displayName = "VisuallyHidden"

export { VisuallyHidden }

