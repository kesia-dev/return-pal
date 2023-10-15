import Image from 'next/image'
import Link from 'next/link'
import MobileMenu from './Header/MobileMenu'
import DesktopHeader from './Header/DesktopHeader'

export default function Header() {
  return (
    <header>
      <div className="sticky top-0 z-50 flex w-screen border-b border-white bg-white px-6 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
        <div className="flex h-24 w-full items-center">
          <Link href="/">
            <Image
              src={'/navbar-logo.png'}
              alt="logo"
              width={200}
              height={200}
            />
          </Link>
          <MobileMenu />
          <DesktopHeader />
        </div>
      </div>
    </header>
  )
}
