import { ReactNode } from "react"

const SubTitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`section-subtitle ${className}`}>{children}</span>
)

const Title = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h2 className={`section-heading ${className}`}>
    {children}
  </h2>
)

const SectionTitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`section-title ${className}`}>
    {children}
  </div>
)

SectionTitle.SubTitle = SubTitle
SectionTitle.Title = Title

export default SectionTitle
