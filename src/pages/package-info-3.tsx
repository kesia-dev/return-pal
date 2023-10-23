import { getLayout } from '@/layouts/DefaultLayout'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState, type ChangeEvent, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { FileUploader } from 'react-drag-drop-files'

type FileUploadType = {
  attachment: string
  labelType: 'Physical' | 'Digital' | 'Amazon'
  description: string | null
}

export const columns: ColumnDef<FileUploadType>[] = [
  {
    accessorKey: 'attachment',
    header: 'Attachment',
    cell: ({ row }) => (
      <div className="break-all text-center">{row.original.attachment}</div>
    ),
  },
  {
    accessorKey: 'labelType',
    header: 'Label Type',
    cell: ({ row }) => (
      <Badge className="text-slate bg-green-200">
        {row.original.labelType}
      </Badge>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: ' ',
    cell: () => (
      <div className="flex justify-end space-x-1">
        <FontAwesomeIcon
          className="text-primary"
          onClick={() => console.log(123)}
          icon={faPen}
          width={'15'}
          height={'15'}
        />
        <FontAwesomeIcon
          className="text-primary"
          onClick={() => console.log(456)}
          icon={faTrashCan}
          width={'15'}
          height={'15'}
        />
      </div>
    ),
  },
]

const uploads: FileUploadType[] = [
  {
    attachment: 'INV001',
    labelType: 'Physical',
    description: 'nike shoes',
  },
  {
    attachment: 'INV002',
    labelType: 'Digital',
    description: 'nike shoes',
  },
  {
    attachment: 'supercalifragilisticexpialidocious',
    labelType: 'Amazon',
    description: 'The rain in Spain stays mainly in the plain',
  },
]

export default function PackageInfo3() {
  const [arrayOfLabels, setArrayOfLabels] = useState<FileUploadType[]>([])
  const [labelDescription, setLabelDescription] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const handleChange = (loadedFile: File) => {
    setFile(loadedFile)
    console.log(file)
    console.log(loadedFile)
  }
  const table = useReactTable({
    data: arrayOfLabels,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const fileTypes = ['JPG', 'PNG', 'PDF']
  const addLabelToTable = (
    file: File | null,
    type: 'Physical' | 'Digital' | 'Amazon'
  ) => {
    console.log(labelDescription)
    console.log(file)
    if (file) {
      setArrayOfLabels([
        ...arrayOfLabels,
        {
          attachment: file?.name,
          labelType: type,
          description: labelDescription,
        },
      ])
    }
  }

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLabelDescription(event.target.value)
  }

  useEffect(() => {
    setArrayOfLabels(uploads)
  }, [])

  return (
    <div className="mx-5 my-10 flex flex-col flex-wrap justify-around lg:mx-10">
      <div className="my-5 text-mediumText font-bold text-brand">
        Package Details
      </div>
      <div className="mb-5 mr-5 flex justify-between text-brand">
        <div>
          Select label type and we&apos;ll handle the label printing and
          repackaging. You can add multiple packages.
        </div>
        <Dialog>
          <DialogTrigger>
            <div>How it works</div>
          </DialogTrigger>
          <DialogContent className="bg-paleBlue">
            <DialogHeader>
              <DialogTitle className="text-center font-bold text-brand">
                How to add a package
              </DialogTitle>
            </DialogHeader>
            <div className="px-5 text-brand">
              <div className="text-center font-bold text-brand">
                Instructions
              </div>
              <div>
                Step 1: Click on the type of label you have.
                <Image
                  height={300}
                  width={500}
                  src="/images/Step1.png"
                  alt="Step 1 example Image"
                />
              </div>
              <div>
                Step 2: Drag your file over the area or click to browse your
                computer&apos;s files
                <Image
                  height={300}
                  width={500}
                  src="/images/Step2.png"
                  alt="Step 2 example image"
                />
              </div>
              <div>
                Step 3: Fill in the description
                <Image
                  height={300}
                  width={500}
                  src="/images/Step3.png"
                  alt="Step 3 example image"
                />
              </div>

              <div>
                Step 4: Click &quot;Add Package&quot; to add it to the list.
                <Image
                  height={300}
                  width={500}
                  src="/images/Step4.png"
                  alt="Step 4 example image"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="w-full px-5"> I understand</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex w-full flex-col justify-between lg:flex-row">
        <div className="relative w-full overflow-auto rounded-lg border-2 border-primary dark:border-gray-700 lg:w-1/2">
          <Table>
            <TableHeader className="border-b-2 border-primary bg-primary bg-opacity-20">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-center font-semibold text-primary"
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
                    className="bg-white"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="text-center">
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

        <div className="my-5 flex flex-row justify-between px-5 text-center lg:my-0 lg:w-1/2">
          {/* <div className="flex w-[30%] min-w-[30%] flex-col justify-between rounded-md border-4 border-brand bg-white font-bold text-brand lg:text-2xl">
          </div> */}
          <Dialog>
            <DialogTrigger className="flex w-[30%] min-w-[30%] max-w-2xl flex-col justify-between rounded-md border-4 border-brand bg-white font-bold text-brand lg:text-2xl">
              <div className="mx-2 flex h-full grow flex-col justify-center self-center">
                <div className="h-3/4">
                  <div className="mt-2 flex justify-center text-center">
                    <Image
                      height={58}
                      width={65}
                      src="/images/physical.png"
                      alt="physical label image"
                    />
                  </div>
                  <div className="3xl:mx-10  my-2 2xl:mx-5">Physical Label</div>
                </div>
                <div className="h-1/4 text-largeText text-primary  lg:text-6xl">
                  +
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="bg-paleBlue">
              <DialogHeader>
                <DialogTitle className="text-center font-bold text-brand">
                  Add Physical Label
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col px-5">
                <div className="font-bold text-brand">Instructions</div>
                <div className=" text-brand">
                  {/* <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    defaultValue='Label the item(s) inside: e.g. "laptop covers/"'
                    className="col-span-3"
                  /> */}
                  Please leave your physical label with your package.
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button className="w-full px-5"> I understand</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* <div className="flex w-[30%] min-w-[30%] flex-col justify-between rounded-md border-4 border-brand bg-white font-bold text-brand lg:text-2xl">
          </div> */}
          <Dialog>
            <DialogTrigger className="flex w-[30%] min-w-[30%] max-w-2xl  flex-col justify-between rounded-md border-4 border-brand bg-white font-bold text-brand lg:text-2xl">
              <div className="mx-2 flex h-full grow flex-col justify-center self-center">
                <div className="h-3/4">
                  <div className="mt-2 flex justify-center text-center">
                    <Image
                      height={58}
                      width={65}
                      src="/images/digital.png"
                      alt="digital label image"
                    />
                  </div>
                  <div className="3xl:mx-15 my-2 md:mx-4 2xl:mx-10">
                    {' '}
                    Digital Label{' '}
                  </div>
                </div>
                <div className="h-1/4 text-largeText text-primary  lg:text-6xl">
                  +
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="bg-paleBlue">
              <DialogHeader>
                <DialogTitle className="text-center font-bold text-brand">
                  Add Digital Label
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col px-5">
                <div className="font-bold text-brand">Upload Return Label</div>
                <div className="align-center min-h-20 flex h-20 flex-col justify-center rounded-lg border-2 bg-blue-200 text-center">
                  <FileUploader
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                  >
                    {' '}
                    <p className=" text-gray-500">
                      Drag label here or
                      <Input type="file" id="files" className="hidden" />
                      <Label
                        className="text-mediumText text-primary"
                        htmlFor="files"
                      >
                        {' '}
                        browse files
                      </Label>
                    </p>
                  </FileUploader>
                </div>
                <div className="font-bold text-brand">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    defaultValue='Label the item(s) inside: e.g. "laptop covers/"'
                    // value={labelDescription}
                    onChange={handleDescriptionChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    className="w-full px-5"
                    onClick={() => void addLabelToTable(file, 'Digital')}
                  >
                    {' '}
                    Add Package
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* <div className="flex w-[30%] min-w-[30%] flex-col justify-between rounded-md border-4 border-brand bg-white font-bold text-brand lg:text-2xl">
            
          </div> */}
          <Dialog>
            <DialogTrigger className="flex w-[30%] min-w-[30%] max-w-2xl  flex-col justify-between rounded-md border-4 border-brand bg-white font-bold text-brand lg:text-2xl">
              <div className="mx-2 flex h-full grow flex-col justify-center self-center">
                <div className="h-3/4">
                  <div className="mt-2 flex justify-center text-center">
                    <Image
                      height={58}
                      width={65}
                      src="/images/qr.png"
                      alt="QR code image"
                    />
                  </div>
                  <div className="my-2  ">Amazon QR Code</div>
                </div>
                <div className="h-1/4 text-largeText text-primary  lg:text-6xl">
                  +
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="bg-paleBlue">
              <DialogHeader>
                <DialogTitle className="text-center font-bold text-brand">
                  Add Amazon QR Code
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col px-5">
                <div className="font-bold text-brand">Upload Return Label</div>
                <div className="align-center min-h-20 flex h-20 flex-col justify-center rounded-lg border-2 bg-blue-200 text-center">
                  <FileUploader
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                  >
                    {' '}
                    <p className=" text-gray-500">
                      Drag label here or
                      <Input type="file" id="files" className="hidden" />
                      <Label
                        className="text-mediumText text-primary"
                        htmlFor="files"
                      >
                        {' '}
                        browse files
                      </Label>
                    </p>
                  </FileUploader>
                </div>
                <div className="font-bold text-brand">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    defaultValue='Label the item(s) inside: e.g. "laptop covers/"'
                    // value={labelDescription}
                    onChange={handleDescriptionChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    className="w-full px-5"
                    onClick={() => void addLabelToTable(file, 'Amazon')}
                  >
                    {' '}
                    Add Package
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}

PackageInfo3.getLayout = getLayout
