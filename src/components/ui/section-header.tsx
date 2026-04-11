import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 space-y-4",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-outfit">
        {title}
      </h2>
      {subtitle && (
        <p className={cn(
          "max-w-[700px] text-muted-foreground md:text-xl",
          align === "center" && "mx-auto"
        )}>
          {subtitle}
        </p>
      )}
      <div className={cn(
        "h-1 w-20 bg-primary rounded-full",
        align === "center" && "mx-auto"
      )} />
    </div>
  )
}
