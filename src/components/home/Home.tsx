/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils'
import React from 'react'

const HomeSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col items-center justify-center space-y-10',
      className
    )}
    {...props}
  />
))
HomeSection.displayName = 'HomeSection'

const HomeSectionTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('text-5xl font-bold', className)} {...props} />
))
HomeSectionTitle.displayName = 'HomeSectionTitle'

const HomeSectionTitleHighlight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('text-5xl font-bold text-primary', className)}
    {...props}
  />
))
HomeSectionTitleHighlight.displayName = 'HomeSectionTitleHighlight'

const HomeSectionDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'w-3/5 shrink text-center font-semibold text-brand',
      className
    )}
    {...props}
  />
))
HomeSectionDescription.displayName = 'HomeSectionDescription'

export {
  HomeSection,
  HomeSectionTitle,
  HomeSectionTitleHighlight,
  HomeSectionDescription,
}
