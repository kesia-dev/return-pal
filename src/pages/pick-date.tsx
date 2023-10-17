import { HeaderRoot, HeaderSub } from '@/components/Headers/Header'
import ReturnPalTitle from '@/components/SvgComponents/ReturnPalTitle'
import {
  HomeSection,
  SectionDescription,
  SectionHeader,
  SectionHeaderHighlight,
} from '@/components/home/Home'
import { Card, CardContent } from '@/components/ui/card'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'

function PickDateCard() {
  return (
    <Card className="w-40 border-brand bg-paleBlue text-brand">
      <CardContent className="flex flex-col items-center space-y-4 pt-6">
        <p className="text-2xl font-semibold">Sep</p>
        <p className="text-5xl font-bold">22</p>
        <p className="text-2xl font-semibold">Fri</p>
      </CardContent>
    </Card>
  )
}

function SelectedPickDateCard() {
  return (
    <Card className="h-52 w-40 border-8 border-primary bg-white text-brand">
      <CardContent className="flex flex-col items-center space-y-4 pt-6">
        <p className="text-2xl font-semibold">Sep</p>
        <p className="text-5xl font-bold">22</p>
        <p className="text-2xl font-semibold">Fri</p>
      </CardContent>
    </Card>
  )
}

export default function PickDate() {
  return (
    <>
      <HeaderRoot className="border-brand bg-brand">
        <HeaderSub>
          <Link href="/">
            <div className="flex items-center space-x-2">
              <ReturnPalTitle className="hidden h-10 w-40 fill-white lg:flex" />
            </div>
          </Link>
        </HeaderSub>
      </HeaderRoot>

      <div className="container bg-paleBlue p-16">
        <HomeSection className="items-start">
          <SectionHeader className="flex w-full justify-between">
            <div>
              Choose a pickup{' '}
              <SectionHeaderHighlight>date</SectionHeaderHighlight>
            </div>
            <div className="flex flex-col items-center justify-center text-base text-primary">
              <FontAwesomeIcon icon={faClose} size="2xl" />
              <p>Cancel</p>
            </div>
          </SectionHeader>
          <SectionDescription>
            We’ll text you the morning of your pickup with an estimated time
            arrival.
          </SectionDescription>
        </HomeSection>

        <div className="flex gap-x-4">
          <PickDateCard />
          <PickDateCard />
          <PickDateCard />
          <SelectedPickDateCard />
          <PickDateCard />
          <PickDateCard />
          <PickDateCard />
          {/* <Card className="w-40 border-brand bg-white text-brand">
            <CardContent className="flex flex-col items-center space-y-4 pt-6">
              <p className="text-2xl font-semibold">Sep</p>
              <p className="text-5xl font-bold">22</p>
              <p className="text-2xl font-semibold">Fri</p>
            </CardContent>
          </Card>

          <Card className="w-40 border-brand bg-white text-brand">
            <CardContent className="flex flex-col items-center space-y-4 pt-6">
              <p className="text-2xl font-semibold">Sep</p>
              <p className="text-5xl font-bold">22</p>
              <p className="text-2xl font-semibold">Fri</p>
            </CardContent>
          </Card> */}
        </div>
      </div>
    </>
  )
}
