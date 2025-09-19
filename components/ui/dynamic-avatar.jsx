"use client"

import Image from "next/image"
import { getConsistentProfileImage, avatarProps, smallAvatarProps, largeAvatarProps } from "@/lib/profile-images"

/**
 * Dynamic Avatar Component
 * Automatically assigns profile images based on user name and gender
 */
export function DynamicAvatar({ 
  name, 
  size = "medium", 
  className = "", 
  fallback = null,
  ...props 
}) {
  const profileImage = getConsistentProfileImage(name)
  
  // Size-based styling
  const sizeProps = {
    small: smallAvatarProps,
    medium: avatarProps,
    large: largeAvatarProps
  }[size] || avatarProps
  
  const combinedClassName = `${sizeProps.className} ${className}`.trim()
  
  return (
    <div className="relative">
      <Image
        src={profileImage}
        alt={`${name}'s profile`}
        width={size === "small" ? 32 : size === "large" ? 80 : 64}
        height={size === "small" ? 32 : size === "large" ? 80 : 64}
        className={combinedClassName}
        style={sizeProps.style}
        {...props}
      />
      {fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-full">
          {fallback}
        </div>
      )}
    </div>
  )
}

/**
 * Avatar with initials fallback
 */
export function AvatarWithInitials({ 
  name, 
  size = "medium", 
  className = "",
  ...props 
}) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
  
  return (
    <DynamicAvatar
      name={name}
      size={size}
      className={className}
      fallback={
        <span className={`font-bold text-gray-600 ${
          size === "small" ? "text-xs" : 
          size === "large" ? "text-lg" : 
          "text-sm"
        }`}>
          {initials}
        </span>
      }
      {...props}
    />
  )
}

/**
 * Simple avatar without fallback
 */
export function SimpleAvatar({ 
  name, 
  size = "medium", 
  className = "",
  ...props 
}) {
  return (
    <DynamicAvatar
      name={name}
      size={size}
      className={className}
      {...props}
    />
  )
}
