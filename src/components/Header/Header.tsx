import React from 'react'
import { Button } from '@/components/ui/button'

function Header() {
  return (
    <div className=" font text flex h-16 w-full flex-row items-center justify-between bg-primary px-4 text-brand shadow-md">
      <h1 className="text-2xl font-bold">Reture-Pal</h1>
      <Button type="button">Login</Button>
    </div>
  )
}

export default Header
