import React from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { type Mail } from '@/components/DashBoard/types'
import Logo from '@/components/SvgComponents/Logo'
import { AiOutlineClose } from 'react-icons/ai'

function InboxMessagesDialog({ mailOriginal }: { mailOriginal: Mail }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          View Complete Message
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="rounded-md">
        <DialogHeader className="relative my-4 space-y-4">
          <div className="flex justify-between">
            <Logo className="absolute -top-16 left-1/2 h-10 w-10 -translate-x-1/2" />
          </div>
          <DialogTitle className="mb-4">Message Details</DialogTitle>
          <DialogDescription>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter
          
          className="relative h-10"
        >
          {mailOriginal.shippingStatus === 'Pending' ? (
            <DialogClose asChild>
              <Button>Pay Bill</Button>
            </DialogClose>
          ) : null}
          <DialogClose
            asChild
            className="absolute -bottom-20 left-1/2 -translate-x-1/2"
          >
            <Button
              variant="secondary"
              size="icon"
              className="h-12 w-12 rounded-full"
            >
              <AiOutlineClose />
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default InboxMessagesDialog
