import { ReactNode } from "react"

export type profileOption = {
    label: string,
    icon: ReactNode,
    options: Record<string, { label: string; icon: ReactNode, link: string }>;
}