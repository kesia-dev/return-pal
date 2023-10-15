import Image from 'next/image'
import Link from 'next/link'
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Combine,
  Calculator,
  Users2,
  Unplug,
  Truck,
  MenuSquare,
} from 'lucide-react'
import MobileMenuFooter from './MobileMenuFooter'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function MobileMenu() {
  return (
    <nav className="flex w-full justify-end px-2 md:hidden">
      <Sheet>
        <SheetTrigger>
          <FontAwesomeIcon icon={faBars} width={'20'} />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex w-screen flex-col items-start justify-start pl-12"
        >
          <SheetTitle className="mb-8 mt-8">
            <Image
              src={'/navbar-logo.png'}
              alt="logo"
              width={200}
              height={200}
            />
          </SheetTitle>
          <p className="flex w-[70%] gap-x-2 border-b border-b-grey pb-2">
            <MenuSquare className="w-5" />
            Menu
          </p>
          <SheetClose asChild>
            <Link href="/" className="text-secondary hover:text-primary">
              <p className="flex gap-x-2">
                <Combine className="w-5" />
                How it Works
              </p>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/" className="text-secondary  hover:text-primary">
              <p className="flex gap-x-2">
                <Calculator className="w-5" />
                Pricing
              </p>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/about" className="text-secondary hover:text-primary">
              <p className="flex gap-x-2">
                <Users2 className="w-5" />
                About Us
              </p>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/sign-in" className="text-secondary hover:text-primary">
              <p className="flex gap-x-2">
                <Unplug className="w-5" />
                Sign In
              </p>
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link href="/" className="text-secondary hover:text-primary">
              <p className="flex gap-x-2">
                <Truck className="w-5" />
                Schedule Pickup
              </p>
            </Link>
          </SheetClose>
          <MobileMenuFooter />
        </SheetContent>
      </Sheet>
    </nav>
  )
}

export default MobileMenu
