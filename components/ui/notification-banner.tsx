import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { Button } from "./button"

interface NotificationBannerProps {
    type?: "success" | "warning" | "error" | "info"
    title: string
    description?: string
    onClose?: () => void
    className?: string
    action?: {
        label: string
        onClick: () => void
    }
}

export function NotificationBanner({
    type = "info",
    title,
    description,
    onClose,
    className,
    action
}: NotificationBannerProps) {
    const icons = {
        success: CheckCircle,
        warning: AlertTriangle,
        error: AlertCircle,
        info: Info
    }

    const styles = {
        success: "bg-green-50 border-green-200 text-green-800",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
        error: "bg-red-50 border-red-200 text-red-800",
        info: "bg-blue-50 border-blue-200 text-blue-800"
    }

    const Icon = icons[type]

    return (
        <div className={cn(
            "flex items-start gap-3 p-4 rounded-lg border",
            styles[type],
            className
        )}>
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{title}</h4>
                {description && (
                    <p className="text-sm mt-1 opacity-90">{description}</p>
                )}
                {action && (
                    <Button
                        size="sm"
                        variant="outline"
                        className="mt-2 h-7 text-xs"
                        onClick={action.onClick}
                    >
                        {action.label}
                    </Button>
                )}
            </div>
            {onClose && (
                <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 flex-shrink-0"
                    onClick={onClose}
                >
                    <X className="w-4 h-4" />
                </Button>
            )}
        </div>
    )
}
