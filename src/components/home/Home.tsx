/* eslint-disable react/prop-types */
import { cn } from '@/lib/utils'
import { type ImageLoader } from 'next/dist/client/image-component'
import {
  type OnLoadingComplete,
  type PlaceholderValue,
  type StaticImport,
} from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import React from 'react'
import { type ForwardRefRenderFunction } from 'react'

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

const SectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-4xl font-bold lg:text-5xl', className)}
    {...props}
  />
))
SectionHeader.displayName = 'SectionHeader'

const SectionHeaderHighlight = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    className={cn('font-bold text-primary', className)}
    {...props}
  />
))
SectionHeaderHighlight.displayName = 'SectionHeaderHighlight'

const SectionDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'shrink text-center text-base font-semibold text-brand sm:text-lg', //  md:w-4/5
      className
    )} //  md:w-4/5
    {...props}
  />
))
SectionDescription.displayName = 'SectionDescription'

const HomeSectionImageRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('h-52 w-52 space-y-4', className)} //md:h-72 md:w-72
    {...props}
  />
))
HomeSectionImageRoot.displayName = 'HomeSectionImageRoot'

const HomeSectionImage: ForwardRefRenderFunction<
  HTMLImageElement,
  NextImageProps
> = ({ className, ...props }, ref) => (
  // eslint-disable-next-line jsx-a11y/alt-text
  <Image
    className={cn('rounded-full border-8 border-primary', className)}
    ref={ref}
    {...props}
  />
)
HomeSectionImage.displayName = 'HomeSectionImage'

const HomeSectionImageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col', className)} {...props} />
))
HomeSectionImageContent.displayName = 'HomeSectionImageContent'

export {
  HomeSection,
  SectionHeader,
  SectionHeaderHighlight,
  SectionDescription,
  HomeSectionImageRoot,
  HomeSectionImage,
}

type NextImageProps = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  'height' | 'width' | 'loading' | 'ref' | 'alt' | 'src' | 'srcSet'
> & {
  src: string | StaticImport
  alt: string
  width?: number | `${number}` | undefined
  height?: number | `${number}` | undefined
  fill?: boolean | undefined
  loader?: ImageLoader | undefined
  quality?: number | `${number}` | undefined
  priority?: boolean | undefined
  loading?: 'eager' | 'lazy' | undefined
  placeholder?: PlaceholderValue | undefined
  blurDataURL?: string | undefined
  unoptimized?: boolean | undefined
  onLoadingComplete?: OnLoadingComplete | undefined
  layout?: string | undefined
  objectFit?: string | undefined
  objectPosition?: string | undefined
  lazyBoundary?: string | undefined
  lazyRoot?: string | undefined
} & React.RefAttributes<HTMLImageElement | null>
