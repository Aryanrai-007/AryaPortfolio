import * as React from "react"
import { Button, type ButtonProps } from "@/components/ui/button"

export interface CtaProps {
  ctaEnabled?: boolean
  text: string
  link?: string
  variant?: ButtonProps["variant"]
  size?: ButtonProps["size"]
  onClick?: () => void
}

export function Cta({ cta }: { cta: CtaProps }) {
  if (!cta || !cta.ctaEnabled) return null

  if (cta.link) {
    return (
      <Button variant={cta.variant} size={cta.size} asChild>
        <a href={cta.link} target="_blank" rel="noopener noreferrer">
          {cta.text}
        </a>
      </Button>
    )
  }

  return (
    <Button variant={cta.variant} size={cta.size} onClick={cta.onClick}>
      {cta.text}
    </Button>
  )
}
