import { cn } from "@/lib/utils"
import { Card, CardContent } from "./card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps {
    title: string
    value: string | number
    description?: string
    icon: LucideIcon
    trend?: {
        value: string
        direction: "up" | "down" | "neutral"
    }
    className?: string
}

export function StatsCard({
    title,
    value,
    description,
    icon: Icon,
    trend,
    className
}: StatsCardProps) {
    return (
        <Card className={cn("hover:shadow-md transition-shadow", className)}>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
                        <p className="text-2xl font-bold">{value}</p>
                        {description && (
                            <p className="text-xs text-muted-foreground mt-1">{description}</p>
                        )}
                        {trend && (
                            <div className="flex items-center gap-1 mt-2">
                                <span
                                    className={cn(
                                        "text-xs font-medium",
                                        trend.direction === "up" && "text-green-600",
                                        trend.direction === "down" && "text-red-600",
                                        trend.direction === "neutral" && "text-gray-600"
                                    )}
                                >
                                    {trend.value}
                                </span>
                                {trend.direction === "up" && <span className="text-green-600">↗</span>}
                                {trend.direction === "down" && <span className="text-red-600">↘</span>}
                                {trend.direction === "neutral" && <span className="text-gray-600">→</span>}
                            </div>
                        )}
                    </div>
                    <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Icon className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
