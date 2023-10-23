import React, { useState, useMemo } from 'react'
import DashBoardHeader from './DashBoardHeader'
import { RxCaretSort, RxDotsHorizontal, RxChevronDown } from 'react-icons/rx'
import { type ColumnDef } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { type Mail } from '@/components/DashBoard/types'
import { mailData } from '@/components/DashBoard/dummyData'
import { Badge } from '@/components/ui/badge'
import InboxDataTable from '@/components/DashBoard/InboxDataTable'

function Inbox() {
  const data = useMemo(() => mailData, [])

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
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
          const amount = parseFloat(row.getValue('amount'))

          // Format the amount as a dollar amount
          const formatted = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'CAD',
          }).format(amount)

          return <div className="text-right font-medium">{formatted}</div>
        },
      },
      {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
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
                <DropdownMenuItem>Delete Message</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
    ]
  }, [])

  return (
    <>
      <DashBoardHeader
        firstName="John"
        lastName="Doe"
        email="john@example.com"
      />
      <InboxDataTable data={data} columns={columns} />
    </>
  )
}

export default Inbox
