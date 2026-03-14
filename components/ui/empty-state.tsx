import React from "react"
import { Layers } from "lucide-react"

interface EmptyStateProps {
  title: string
  message?: string
  icon?: React.ReactNode
  actionLabel?: string
  onAction?: () => void
  className?: string
}

const EmptyState = ({
  title,
  message,
  icon,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-xl bg-white p-8 ${className}`}
    >
      {/* Icon */}
      <div className="mb-4 rounded-full bg-gray-100 p-5">
        {icon || <Layers size={40} className="text-gray-400" />}
      </div>

      {/* Title */}
      <h3 className="mb-2 text-center text-xl font-semibold text-gray-900">
        {title}
      </h3>

      {/* Message */}
      {message && (
        <p className="mb-6 max-w-xs text-center leading-6 text-gray-500">
          {message}
        </p>
      )}

      {/* Action Button */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="rounded-lg bg-black px-8 py-2 text-white transition hover:bg-gray-800"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
