import Image from 'next/image'
import Link from 'next/link'
import MobileMenu from './Header/MobileMenu'
import DesktopHeader from './Header/DesktopHeader'
import { HeaderSub, HeaderRoot } from './Header/Header'

export default function Header() {
  return (
    <HeaderRoot>
      <HeaderSub>
        <Link href="/">
          <Image src={'/navbar-logo.png'} alt="logo" width={200} height={200} />
        </Link>
        <MobileMenu />
        <DesktopHeader />
      </HeaderSub>
    </HeaderRoot>
  )
}
