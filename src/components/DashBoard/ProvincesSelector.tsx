import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { canadaProvinces } from '@lib/constants'

export function ProvincesSelector({
  onValueChange,
  defaultValue,
}: {
  onValueChange: (value: string) => void
  defaultValue: string
}) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger className="w-full text-stone-400">
        <SelectValue placeholder="Select a Province" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {canadaProvinces.map((province) => (
            <SelectItem key={province.id} value={province.value}>
              {province.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
