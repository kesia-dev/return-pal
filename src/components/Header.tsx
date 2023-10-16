import Image from 'next/image'
import Link from 'next/link'
import { HeaderRoot, HeaderSub } from '@components/Headers/Header'
import MobileMenu from '@components/Headers/MobileHeader'
import DesktopHeader from '@components/Headers/DesktopHeader'

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
