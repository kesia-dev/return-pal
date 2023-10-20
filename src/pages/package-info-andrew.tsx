import { getLayout } from '@/layouts/DefaultLayout'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'

type FileUploadType = {
  attachment: string
  labelType: 'physical' | 'digital' | 'amazon'
  description: string
}

export const columns: ColumnDef<FileUploadType>[] = [
  {
    accessorKey: 'attachment',
    header: 'Attachment',
  },
  {
    accessorKey: 'labelType',
    header: 'Label Type',
    cell: ({ row }) => <Badge>{row.original.labelType}</Badge>,
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: ' ',
    cell: () => (
      <div className="flex justify-end space-x-1">
        <FontAwesomeIcon icon={faPen} width={'15'} height={'15'} />
        <FontAwesomeIcon icon={faTrashCan} width={'15'} height={'15'} />
      </div>
    ),
  },
]

const uploads: FileUploadType[] = [
  {
    attachment: 'INV001',
    labelType: 'physical',
    description: 'nike shoes',
  },
  {
    attachment: 'INV002',
    labelType: 'digital',
    description: 'nike shoes',
  },
  {
    attachment: 'INV003',
    labelType: 'amazon',
    description: 'nike shoes',
  },
]

export default function PackageInfo2() {
  const table = useReactTable({
    data: uploads,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <div className="mx-5 my-10 flex flex-col flex-wrap justify-around lg:mx-10">
      <div className="my-5 text-mediumText font-bold text-brand">
        Package Details
      </div>
      <div className="mb-5 text-brand">
        Select label type and we&apos;ll handle the label printing and
        repackaging. You can add multiple packages.
      </div>

      <div className="relative w-full overflow-auto rounded-lg border-2 border-primary dark:border-gray-700">
        <Table>
          <TableHeader className="border-b-2 border-primary bg-primary bg-opacity-20">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="font-semibold text-primary"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

PackageInfo2.getLayout = getLayout
