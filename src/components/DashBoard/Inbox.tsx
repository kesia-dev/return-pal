import React from 'react'
import DashBoardHeader from './DashBoardHeader'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react'

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
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { type Address } from '@/components/DashBoard/types'

const mailData: Mail[] = [
  {
    id: 'm5gr84i9',
    email: 'ken99@yahoo.com',
    message: 'Hello, I am Ken from Toronto. Your package is delivered.',
    pickupAddress: {
      apartmentUnitNumber: '12A',
      streetNumber: 1234,
      streetName: 'Main St',
      city: 'Toronto',
      province: 'ON',
      postal: 'M1M1M1',
    },
    deliveryAddress: {
      apartmentUnitNumber: '0',
      streetNumber: 999,
      streetName: 'Main St',
      city: 'Toronto',
      province: 'ON',
      postal: 'M1M1M1',
    },
    shippingStatus: 'Delivered',
    retrunDate: '2021-10-20',
  },
  {
    id: '3u1reuv4',
    email: 'Abe45@gmail.com',
    message: 'Hello, I am Abe',
  },
  {
    id: 'derv1ws0',
    email: 'Monserrat44@gmail.com',
    message: 'Hello, I am Monserrat',
  },
  {
    id: '5kma53ae',
    email: 'Silas22@gmail.com',
    message: 'Hello, I am Silas',
  },
  {
    id: 'bhqecj4p',
    email: 'carmella@hotmail.com',
    message: 'Hello, I am Carmella',
  },
]

export type Mail = {
  id: string
  email: string
  message: string
  pickupAddress: Address
  deliveryAddress: Address
  retrunDate: string
  shippingStatus: 'Delivered' | 'In Transit' | 'Pending' | 'Error'
}

function Inbox() {
  return (
    <div>
      <DashBoardHeader
        firstName="John"
        lastName="Doe"
        email="john@example.com"
      />
      Inbox
    </div>
  )
}

export default Inbox
