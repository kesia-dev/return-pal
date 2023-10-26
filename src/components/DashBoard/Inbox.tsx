import React, { useState, useMemo } from 'react'
import DashBoardHeader from './DashBoardHeader'
import { RxCaretSort, RxDotsHorizontal } from 'react-icons/rx'
import { type ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useInboxMessage from '@/hooks/useInboxMessage'

import { type Mail } from '@/components/DashBoard/types'
import { mailData } from '@/components/DashBoard/dummyData'
import { Badge } from '@/components/ui/badge'
import InboxDataTable from '@/components/DashBoard/InboxDataTable'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
function Inbox() {
  // TODO get data from Apollo Client cache intead of dummy data
  const data = useMemo(() => mailData, [])
  // TODO replace useState with useQuery or any other global state management
  const [mails, setMails] = useState<Mail[]>(data)

  // TODO replace handleRemoveMessage with a mutation and update the cache.
  const { handleRemoveMessage, handleRemoveSelectedMessages } = useInboxMessage(
    mails,
    setMails
  )

  const columns = useMemo<ColumnDef<Mail>[]>(() => {
    return [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ row }) => (
          <Badge className="bg-primary">{row.original.id}</Badge>
        ),
      },
      {
        accessorKey: 'shippingStatus',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="hover:bg-transparent hover:text-white"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Status
              <RxCaretSort className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue('shippingStatus')}</div>
        ),
      },
      {
        accessorKey: 'email',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              className="hover:bg-transparent hover:text-white"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Email
              <RxCaretSort className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue('email')}</div>
        ),
      },
      {
        accessorKey: 'message',
        header: 'Message',
        cell: ({ row }) => (
          <div className=" overflow-clip lowercase">
            {row.getValue('message')}
          </div>
        ),
      },
      {
        accessorKey: 'amount',
        header: ({ column }) => {
          return (
            <Button
              className="hover:bg-transparent hover:text-white"
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === 'asc')
              }
            >
              Amount
              <RxCaretSort className="ml-2 h-4 w-4" />
            </Button>
          )
        },
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue('amount'))

          // Format the amount as a dollar amount
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'CAD',
          }).format(amount)

          return <div className="text-center font-medium">{formatted}</div>
        },
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row, table }) => {
          const mail = row.original

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <RxDotsHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard
                      .writeText(mail.id)
                      .then(() => {
                        console.log('Copy message ID', mail.id)
                      })
                      .catch((error) => {
                        console.error('Failed to copy message ID', error)
                      })
                  }}
                >
                  Copy messasge ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Complete Message</DropdownMenuItem>
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      Delete Message
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader className="my-4 space-y-4">
                      <DialogTitle>Message delete confirmation</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this message?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <DialogClose asChild>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            handleRemoveMessage(row)
                          }}
                        >
                          Delete
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {table.getIsSomeRowsSelected() ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        Delete All Selected
                      </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader className="my-4 space-y-4">
                        <DialogTitle>Messages delete confirmation</DialogTitle>
                        <DialogDescription>
                          Are you sure you want to delete these messages from
                          Inbox?
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            variant="destructive"
                            onClick={() => handleRemoveSelectedMessages(table)}
                          >
                            Delete
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ]
  }, [handleRemoveMessage, handleRemoveSelectedMessages])

  return (
    <>
      <DashBoardHeader
        firstName="John"
        lastName="Doe"
        email="john@example.com"
      />
      <InboxDataTable data={mails} columns={columns} />
    </>
  )
}

export default Inbox
