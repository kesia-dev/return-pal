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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  useState,
  type ChangeEvent,
  useEffect,
  useMemo,
  Dispatch,
  SetStateAction,
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPen,
  faTrashCan,
  faFolderBlank,
} from '@fortawesome/free-solid-svg-icons'
import { UploadIcon } from '@radix-ui/react-icons'
import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
  flexRender,
} from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { FileUploader } from 'react-drag-drop-files'
import Head from 'next/head'
import { z } from 'zod'
import { useReturnProcess } from '@/hooks/useReturnProcess'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type FileUploadType } from '@/context/ReturnProcessContext'
import { Form } from '@/components/ui/form'
import {
  ReturnProcessBackButton,
  ReturnProcessNextButton,
  ReturnProcessRoot,
  ReturnProcessSection,
} from '@/components/common/return-process'
import { SectionDescription, SectionHeader } from '@/components/common/section'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@components/ui/scroll-area'
import UploadIconSvg from '@components/SvgComponents/UploadIcon'
import Reveal from '@components/common/reveal'
import {
  deleteReturnLabel,
  getAllReturnLabels,
  updateReturnLabel,
  uploadReturnLabel,
} from '@/services/returnLabelService'
import { Textarea } from '@components/ui/textarea'
import { ToggleGroup } from '@radix-ui/react-toggle-group'
import {
  ExtendedToggleGroup,
  ExtendedToggleGroupItem,
} from '@components/ui/extended-toggle-group'

const ACCEPTED_FILE_TYPES = ['JPG', 'PNG', 'PDF']

const formSchema = z.object(
  {
    labelFileUploads: z
      .array(
        z.object(
          {
            attachment: z.string({
              invalid_type_error: 'attachment invalid',
              required_error: 'attachment req',
              description: 'des',
            }),
            labelType: z.union(
              [
                z.literal('Physical'),
                z.literal('Digital'),
                z.literal('Amazon'),
              ],
              {
                invalid_type_error: 'labelType invalid',
                required_error: 'labelType req',
                description: 'des',
              }
            ),
            description: z.string({
              invalid_type_error: 'description invalid',
              required_error: 'description req',
              description: 'des',
            }),
          },
          {
            invalid_type_error: '11 invalid',
            required_error: '11 req',
            description: 'des',
          }
        )
      )
      .min(1, {
        message: 'arr invalid',
      }),
  },
  {
    invalid_type_error: 'tt invalid',
    required_error: 'tt req',
  }
)

function TutorialDialog() {
  return (
    <Dialog>
      <DialogTrigger className="pr-5">
        <Reveal>
          <div className="hidden font-bold text-primary sm:block">Tutorial</div>
        </Reveal>
      </DialogTrigger>
      <DialogContent className="h-5/6 bg-paleBlue object-scale-down">
        <DialogHeader>
          <Reveal>
            <DialogTitle className="text-center font-bold text-brand">
              How to add a package label
              <div className="text-xs font-normal xxs:invisible">
                Please scroll/swipe down below for more information
              </div>
            </DialogTitle>
          </Reveal>
        </DialogHeader>
        <ScrollArea>
          <div className="px-5 text-brand">
            <Reveal>
              <div className="my-2">
                Step 1: Click on the type of label you have.
                <Image
                  height={300}
                  width={500}
                  src="/images/Step1.png"
                  alt="Step 1 example Image"
                />
              </div>
            </Reveal>
            <Reveal width="100%">
              <Separator className="bg-brand" />
            </Reveal>
            <Reveal>
              <div className="my-2">
                Step 2: Drag your file over the area or click to browse your
                computer&apos;s files. If you are using physical labels you can
                skip this step.
                <Image
                  height={300}
                  width={500}
                  src="/images/Step2.png"
                  alt="Step 2 example image"
                />
              </div>
            </Reveal>
            <Reveal width="100%">
              <Separator className="bg-brand" />
            </Reveal>
            <Reveal>
              <div className="my-2">
                Step 3: Fill in the description box
                <Image
                  height={300}
                  width={500}
                  src="/images/Step3.png"
                  alt="Step 3 example image"
                />
              </div>
            </Reveal>
            <Reveal width="100%">
              <Separator className="bg-brand" />
            </Reveal>
            <Reveal>
              <div className="my-2">
                Step 4: Click &quot;Add Package&quot; to add it to the list.
                <Image
                  height={300}
                  width={500}
                  src="/images/Step4.png"
                  alt="Step 4 example image"
                />
              </div>
            </Reveal>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Reveal width="100%">
            <DialogClose asChild>
              <Button className="w-full px-5">Got it!</Button>
            </DialogClose>
          </Reveal>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function DesktopPackageTable({
  arrayOfLabels,
  onHasModifiedLabels,
}: {
  arrayOfLabels: FileUploadType[]
  onHasModifiedLabels: Dispatch<SetStateAction<boolean>>
}) {
  const columns: ColumnDef<FileUploadType>[] = [
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
        <Badge className="bg-green-200 text-primary hover:bg-brand hover:text-white">
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
      cell: (row) => {
        // using a variable as using state to hold / set value for the new description will close the dialog on change due to re-rendering thus newDescription is being held in a variable
        let newDescription: string
        return (
          <div className="flex justify-end space-x-3 md:space-x-2">
            <Dialog>
              <DialogTrigger>
                <FontAwesomeIcon
                  className="text-primary"
                  icon={faPen}
                  width={'15'}
                  height={'15'}
                />
              </DialogTrigger>
              <DialogContent className="bg-paleBlue">
                <DialogHeader>
                  <DialogTitle className="text-center font-bold text-brand">
                    Edit Label Description
                  </DialogTitle>
                </DialogHeader>
                <div className="font-bold text-brand">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    onChange={(e) => {
                      newDescription = e.target.value
                    }}
                    className="col-span-3"
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      className="w-full px-5"
                      onClick={() => {
                        const newArrayOfLabels = [...arrayOfLabels]
                        const rowId = Number(row.row.id)

                        if (newArrayOfLabels[rowId]) {
                          newArrayOfLabels[rowId]!.description = newDescription
                          updateReturnLabel(newArrayOfLabels[rowId]!)
                        }
                        onHasModifiedLabels(true)
                      }}
                    >
                      {' '}
                      Update Package Description
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger>
                <FontAwesomeIcon
                  className="text-primary"
                  icon={faTrashCan}
                  width={'15'}
                  height={'15'}
                />
              </DialogTrigger>
              <DialogContent className="bg-paleBlue">
                <DialogHeader>
                  <DialogTitle className="text-center font-bold text-brand">
                    Delete Label
                  </DialogTitle>
                </DialogHeader>
                <div className="font-bold text-brand">
                  This action cannot be undone. Are you sure you want to
                  permanently delete this file from our servers?
                </div>
                <DialogFooter className="flex flex-row justify-end">
                  <DialogClose asChild>
                    <Button
                      variant="destructive"
                      className="mx-2 w-1/5 scale-75 rounded-full xs:scale-100"
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      className="mx-2 w-1/5 scale-75 xs:scale-100"
                      onClick={() => {
                        const newArrayOfLabels = [...arrayOfLabels]
                        const rowId = Number(row.row.id)

                        deleteReturnLabel(newArrayOfLabels[rowId]!)
                        newArrayOfLabels.splice(rowId, 1)
                        onHasModifiedLabels(true)
                      }}
                    >
                      {' '}
                      Confirm
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )
      },
    },
  ]
  const table = useReactTable({
    data: arrayOfLabels,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="relative w-full overflow-auto rounded-lg border-2 border-primary bg-white dark:border-gray-700 lg:w-1/2">
      <Reveal width="100%">
        <Table>
          <TableHeader className="border-b-2 border-primary bg-primary bg-opacity-20">
            {table.getHeaderGroups().map((headerGroup: any) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-center font-semibold text-primary"
                    >
                      {header.isPlaceholder
                        ? undefined
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
              table.getRowModel().rows.map((row: any) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="bg-white"
                >
                  {row.getVisibleCells().map((cell: any) => (
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
                  No labels added.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Reveal>
    </div>
  )
}

function DesktopDialog({
  addLabelToTable,
}: {
  addLabelToTable: (
    file: File | undefined,
    type: 'Physical' | 'Digital' | 'Amazon',
    description: string | undefined
  ) => void
}) {
  const [labelDescription, setLabelDescription] = useState<string | undefined>(
    undefined
  )
  const [file, setFile] = useState<File | undefined>(undefined)
  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault()
    setLabelDescription(event.target.value)
  }
  const handleChange = (loadedFile: File) => {
    setFile(loadedFile)
  }
  const handleLabel = (
    file: File | undefined,
    type: 'Physical' | 'Digital' | 'Amazon'
  ) => {
    addLabelToTable(file, type, labelDescription)

    setLabelDescription(undefined)
    setFile(undefined)
  }

  const addPackageStyles =
    'w-[95%] px-5 m-auto font-bold text-white xxs:text-base'
  const descriptionStyles =
    'b-2 col-span-3 resize-none border-solid border-brand border-opacity-50 bg-transparent'
  const fileUploadStyles =
    'align-center b-2 flex flex-col justify-center rounded-lg border-2 border-dashed border-brand border-opacity-50 bg-blue-200 px-4 py-8 text-center'
  const labelDialogClasses =
    'flex w-[30%] min-w-[30%] max-w-2xl flex-col justify-between rounded-3xl border-4 border-brand bg-white font-bold text-brand lg:text-2xl'

  return (
    <div className="my-5 flex flex-row justify-between space-x-2 text-center sm:px-5 md:my-0 md:w-2/3 lg:w-1/2">
      <Dialog>
        <DialogTrigger className={labelDialogClasses}>
          <div className="flex h-full grow flex-col justify-center self-center">
            <div className="h-3/4">
              <div className="mt-2 flex scale-75 justify-center object-scale-down text-center sm:scale-100 md:scale-75 lg:scale-100">
                <Reveal>
                  <Image
                    height={58}
                    width={65}
                    src="/images/physical.png"
                    alt="physical label icon"
                  />
                </Reveal>
              </div>
              <Reveal>
                <div className="3xl:mx-10  my-2 2xl:mx-5">Physical Label</div>
              </Reveal>
            </div>
            <Reveal width="100%">
              <div className="h-1/4 text-largeText text-primary  lg:text-6xl">
                +
              </div>
            </Reveal>
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
              Please leave your physical label with your package.
            </div>
            <div className=" text-brand">
              <Label htmlFor="description" className="text-right font-bold">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder='Label the item(s) inside: e.g. "laptop covers"'
                onChange={handleDescriptionChange}
                className={descriptionStyles}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className={addPackageStyles}
                onClick={() => handleLabel(undefined, 'Physical')}
              >
                Add Package
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger className={labelDialogClasses}>
          <div className="flex h-full grow flex-col justify-center self-center">
            <div className="h-3/4">
              <div className="mt-2 flex scale-75 justify-center object-scale-down text-center sm:scale-100 md:scale-75 lg:scale-100">
                <Reveal>
                  <Image
                    height={58}
                    width={65}
                    src="/images/digital.png"
                    alt="digital label icon"
                  />
                </Reveal>
              </div>
              <Reveal>
                <div className="3xl:mx-15 my-2 md:mx-4 2xl:mx-10">
                  {' '}
                  Digital Label{' '}
                </div>
              </Reveal>
            </div>
            <Reveal width="100%">
              <div className="h-1/4 text-largeText text-primary  lg:text-6xl">
                +
              </div>
            </Reveal>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-paleBlue">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-brand">
              Add Digital Label
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 px-5">
            <div className=" text-brand">Upload Return Label</div>
            <div className={fileUploadStyles}>
              <FileUploader
                handleChange={handleChange}
                name="file"
                types={ACCEPTED_FILE_TYPES}
              >
                {' '}
                <p className="flex h-20 flex-col justify-around text-gray-500">
                  <div className="flex justify-center">
                    <UploadIconSvg />
                  </div>
                  <div className="self-center">
                    Drag label here or
                    <Input type="file" id="files" className="hidden" />
                    <Label
                      className="text-mediumText text-primary"
                      htmlFor="files"
                    >
                      {' '}
                      browse files
                    </Label>
                  </div>
                </p>
              </FileUploader>
            </div>
            <div className="mt-4 text-brand">
              <Label htmlFor="description" className="text-right text-base">
                Description
              </Label>

              <Textarea
                id="description"
                placeholder='Label the item(s) inside: e.g. "laptop covers"'
                onChange={handleDescriptionChange}
                className={descriptionStyles}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className={addPackageStyles}
                onClick={() => handleLabel(file, 'Digital')}
              >
                {' '}
                Add Package
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger className={labelDialogClasses}>
          <div className="flex h-full grow flex-col justify-center self-center">
            <div className="h-3/4">
              <div className="mt-2 flex scale-75 justify-center object-scale-down text-center sm:scale-100 md:scale-75 lg:scale-100">
                <Reveal>
                  <Image
                    height={58}
                    width={65}
                    src="/images/qr.png"
                    alt="QR code image"
                  />
                </Reveal>
              </div>
              <Reveal>
                <div className="my-2">Amazon QR Code</div>
              </Reveal>
            </div>
            <Reveal width="100%">
              <div className="h-1/4 text-largeText text-primary  lg:text-6xl">
                +
              </div>
            </Reveal>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-paleBlue">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-brand">
              Add Amazon QR Code
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col px-5">
            <div className="font-bold text-brand">Upload Amazon QR Code</div>
            <div className={fileUploadStyles}>
              <FileUploader
                className="flex-grow"
                handleChange={handleChange}
                name="file"
                types={ACCEPTED_FILE_TYPES}
              >
                {' '}
                <p className="flex h-20 flex-col justify-around text-gray-500">
                  <div className="flex justify-center">
                    <UploadIconSvg />
                  </div>
                  <div className="self-center">
                    Drag label here or
                    <Input type="file" id="files" className="hidden" />
                    <Label
                      className="text-mediumText text-primary"
                      htmlFor="files"
                    >
                      {' '}
                      browse files
                    </Label>
                  </div>
                </p>
              </FileUploader>
            </div>
            <div className="text-base text-brand">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder='Label the item(s) inside: e.g. "laptop covers"'
                onChange={handleDescriptionChange}
                className={descriptionStyles}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className={addPackageStyles}
                onClick={() => handleLabel(file, 'Amazon')}
              >
                {' '}
                Add Package
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function MobileLabelUpload({
  file,
  description,
  onFile,
  onDescription,
  onConfirm,
  labelType,
}: {
  file: File
  description: string
  onFile: Dispatch<SetStateAction<File | undefined>>
  onDescription: Dispatch<SetStateAction<string>>
  onConfirm: () => void
  labelType: 'Physical' | 'Digital' | 'Amazon'
}) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    onFile(file)
  }

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    onDescription(e.target.value)
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <DialogTitle>Upload your Label</DialogTitle>
        <DialogDescription>Upload file from your device</DialogDescription>
      </div>
      {labelType !== 'Physical' && (
        <>
          <label
            htmlFor="file-upload-mobile"
            className="flex items-center justify-center rounded-md border-2 border-dashed border-brand border-opacity-50 bg-[#EDEDED] px-1 py-2 text-center text-brand/60"
          >
            {file ? (
              <>
                <FontAwesomeIcon
                  icon={faFolderBlank}
                  height={'20px'}
                  width={'20px'}
                  className="mr-4"
                  flip="vertical"
                />
                {file.name}
              </>
            ) : (
              <>
                <UploadIcon className="mr-4 h-6 w-6" />
                Select a file to upload
              </>
            )}
          </label>
          <Input
            id="file-upload-mobile"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
      <div className="flex flex-col gap-5">
        <DialogTitle className="mt-7">Add Description</DialogTitle>
        <Input
          className="rounded-xl  border-2 border-[#D9D9D9] placeholder:text-[#D9D9D9]"
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          placeholder='Label the item(s) inside, i.e "laptop"'
        />
      </div>
      <DialogClose asChild>
        <Button
          disabled={labelType !== 'Physical' && !Boolean(file)}
          className="mt-[70px] px-3 py-6 disabled:bg-[#D9D9D9] disabled:text-white xxs:text-smallText"
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </DialogClose>
    </>
  )
}

function MobileLabelTypeSelection({
  label,
  onValueChange,
  onIndex,
}: {
  label: 'Physical' | 'Digital' | 'Amazon' | undefined
  onValueChange: Dispatch<
    SetStateAction<'Physical' | 'Digital' | 'Amazon' | undefined>
  >
  onIndex: Dispatch<SetStateAction<0 | 1>>
}) {
  const handleValueChange = (value: 'Physical' | 'Digital' | 'Amazon') => {
    onValueChange(value)
  }

  const labelStyles =
    'data-[state=on]:bg-brand data-[state=on]:text-white data-[state=on]:font-semibold data-[state=on]:transition-colors flex items-center gap-6 px-2 py-4 bg-[#F8F8F8] rounded-lg border-2 border-solid border-brand'
  return (
    <>
      <DialogTitle>Select Label Type</DialogTitle>
      <DialogDescription>
        Choose which label you'd like to upload
      </DialogDescription>
      <ExtendedToggleGroup
        value={label}
        onValueChange={handleValueChange}
        type="single"
        id="labels-to-upload"
        className="flex flex-col gap-2"
      >
        <ExtendedToggleGroupItem
          value={'Physical'}
          key={'Physical'}
          className={labelStyles}
        >
          <Image
            className="ml-4"
            height={33}
            width={42}
            src="/images/physical.png"
            alt="physical label icon"
          />
          <span>Physical Label</span>
        </ExtendedToggleGroupItem>
        <ExtendedToggleGroupItem
          value={'Digital'}
          key={'Digital'}
          className={labelStyles}
        >
          <Image
            className="ml-4"
            height={40}
            width={40}
            src="/images/digital.png"
            alt="digital label icon"
          />
          <span>Digital Label</span>
        </ExtendedToggleGroupItem>
        <ExtendedToggleGroupItem
          value="Amazon"
          key={'Amazon'}
          className={labelStyles}
        >
          <Image
            className="ml-5"
            height={32}
            width={35}
            src="/images/qr.png"
            alt="QR code image"
          />
          <span>Amazon Label</span>
        </ExtendedToggleGroupItem>
      </ExtendedToggleGroup>
      <Button
        className="px-3 py-6 disabled:bg-[#D9D9D9] disabled:text-white xxs:text-smallText"
        disabled={!Boolean(label)}
        onClick={() => onIndex(1)}
      >
        Next
      </Button>
    </>
  )
}

// MAIN MOBILE DIALOG
function MobileDialog({
  addLabelToTable,
  onHasModifiedLabels,
}: {
  addLabelToTable: (
    file: File | undefined,
    type: 'Physical' | 'Digital' | 'Amazon',
    description: string | undefined
  ) => void
  onHasModifiedLabels: Dispatch<SetStateAction<boolean>>
}) {
  // index between state of the dialog
  const [index, setIndex] = useState<0 | 1>(0)
  const [label, setLabel] = useState<
    'Physical' | 'Digital' | 'Amazon' | undefined
  >()
  const [description, setDescription] = useState<string>('')
  const [file, setFile] = useState<File>()

  const resetSelections = () => {
    setIndex(0)
    setLabel(undefined)
    setFile(undefined)
    setDescription('')
  }

  const handleConfirm = async (
    file: File | undefined,
    type: 'Physical' | 'Digital' | 'Amazon',
    description: string | undefined
  ) => {
    await addLabelToTable(file, type, description)
    onHasModifiedLabels(true)
  }

  return (
    <div className="flex items-center justify-center">
      <Dialog>
        <DialogTrigger onClick={resetSelections} className="w-full">
          <div className="flex flex-col items-center">
            <div className="mt-5 flex w-full flex-col items-center rounded-xl border-2 border-dashed border-brand bg-white px-3 py-6">
              <UploadIcon className="h-8 w-8" />
              <span>Upload label here</span>
            </div>
          </div>
        </DialogTrigger>
        <DialogPortal>
          <DialogContent className="h-[466px] max-w-[90vw] rounded-2xl border-2 border-brand font-avenirNext">
            {index == 0 ? (
              <MobileLabelTypeSelection
                label={label}
                onValueChange={setLabel}
                onIndex={setIndex}
              />
            ) : (
              <MobileLabelUpload
                file={file!}
                description={description}
                onFile={setFile}
                onDescription={setDescription}
                onConfirm={() => handleConfirm(file, label!, description)}
                labelType={label!}
              />
            )}
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </div>
  )
}

function MobilePackageLabel({
  label,
  onHasModifiedLabels,
}: {
  label: FileUploadType
  onHasModifiedLabels: Dispatch<SetStateAction<boolean>>
}) {
  const [description, setDescription] = useState<string>(
    label.description ?? ''
  )

  const handleDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handleSave = async () => {
    const labelToSave: FileUploadType = {
      ...label,
      description,
    }

    await updateReturnLabel(labelToSave)
    onHasModifiedLabels(true)
  }

  const handleDelete = async () => {
    await deleteReturnLabel(label)
    onHasModifiedLabels(true)
  }

  return (
    <Dialog>
      <DialogTrigger>
        <li
          key={label._id}
          className="rounded-lg border-2 border-solid border-[#D9D9D9] bg-white px-4 py-4 text-start transition-colors active:bg-green-300"
        >
          <div className="flex justify-between">
            {label.description?.length! > 0 ? (
              <p>{label.description}</p>
            ) : (
              <p>(No description for item)</p>
            )}
            <Badge className="bg-[#E8FAB2] font-normal text-brand">
              {label.labelType}
            </Badge>
          </div>
          <span className="text-grey">{label.attachment}</span>
        </li>
      </DialogTrigger>
      <DialogContent className=" max-w-[90vw] rounded-2xl border-2 border-brand font-avenirNext">
        <div className="flex flex-col gap-2">
          <DialogTitle>Edit Shipping Label</DialogTitle>
          <DialogDescription>Edit or Delete your Label</DialogDescription>
          <Input
            type="text"
            value={description}
            placeholder='Label the item(s) inside, i.e "laptop"'
            onChange={handleDescription}
          />
          {/* <DialogClose asChild> */}
          <div className="mt-16 flex flex-col gap-4">
            <Button
              onClick={handleDelete}
              className="rounded-2xl px-4"
              variant={'destructive'}
            >
              Delete
            </Button>
            <Button onClick={handleSave} className="rounded-2xl px-4">
              Save
            </Button>
          </div>
          {/* </DialogClose> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}

// MAIN MOBILE TABLE
function MobilePackageTable({
  arrayOfLabels,
  onHasModifiedLabels,
}: {
  arrayOfLabels: FileUploadType[]
  onHasModifiedLabels: Dispatch<SetStateAction<boolean>>
}) {
  return (
    arrayOfLabels.length > 0 && (
      <div>
        <span>Your Added Labels</span>
        <div className="overflow-auto">
          <ul className="flex flex-col gap-2 overflow-hidden">
            {arrayOfLabels.map((label) => (
              <MobilePackageLabel
                label={label}
                onHasModifiedLabels={onHasModifiedLabels}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  )
}

export default function PackageInfo() {
  const returnProcess = useReturnProcess()
  const userId = localStorage.getItem('userId')
  const [hasModifiedLabels, setHasModifiedLabels] = useState<boolean>(false)
  const [arrayOfLabels, setArrayOfLabels] = useState<FileUploadType[]>(
    returnProcess.currentData.labelFileUploads ?? []
  )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      labelFileUploads: returnProcess.currentData.labelFileUploads ?? [],
    },
  })

  useEffect(() => {
    const getReturnLabels = async () => {
      const rls = await getAllReturnLabels(userId!)
      setArrayOfLabels(rls)
    }

    if (hasModifiedLabels) {
      getReturnLabels()
      setHasModifiedLabels(false)
    }
  }, [hasModifiedLabels])

  useEffect(() => {
    if (arrayOfLabels.length === 0) {
      form.setValue('labelFileUploads', [], { shouldValidate: true })
    } else {
      form.setValue(
        'labelFileUploads',
        arrayOfLabels.map((label) => ({
          description: label.description ?? '',
          attachment: label.attachment,
          labelType: label.labelType,
        })),
        { shouldValidate: true }
      )
    }

    returnProcess.setCurrentData({ labelFileUploads: arrayOfLabels })
  }, [arrayOfLabels])

  function onSubmit(values: z.infer<typeof formSchema>) {
    returnProcess.setCurrentData({ labelFileUploads: arrayOfLabels })
    returnProcess.forward()
  }

  const addLabelToTable = async (
    file: File | undefined,
    type: 'Physical' | 'Digital' | 'Amazon',
    description: string | undefined
  ) => {
    const returnLabel = {
      file,
      attachment: file?.name ?? 'N/A',
      labelType: type,
      description: description,
    }

    await uploadReturnLabel(returnLabel, userId!)
    setHasModifiedLabels(true)
  }

  return (
    <>
      <Head>
        <title>Return Process - Package Info</title>
      </Head>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <ReturnProcessRoot className="space-y-6 sm:space-y-14">
            <ReturnProcessSection>
              <Reveal>
                <SectionHeader>Pickup Details</SectionHeader>
              </Reveal>
              <SectionDescription className="flex w-full justify-between">
                <Reveal>
                  <p className="text-start font-normal">
                    Select label type and we&apos;ll handle the label printing
                    and repackaging. You can add multiple packages.
                  </p>
                </Reveal>
                <TutorialDialog />
              </SectionDescription>
            </ReturnProcessSection>

            {/* Main Content  -- DESKTOP */}
            <div className="hidden w-full flex-col justify-between sm:flex md:flex-row">
              <DesktopPackageTable
                arrayOfLabels={arrayOfLabels}
                onHasModifiedLabels={setHasModifiedLabels}
              />
              <DesktopDialog addLabelToTable={addLabelToTable} />
            </div>
            {/* Main Content -- MOBILE */}
            <div className="flex w-full flex-col justify-between sm:hidden md:flex-row">
              <MobilePackageTable
                arrayOfLabels={arrayOfLabels}
                onHasModifiedLabels={setHasModifiedLabels}
              />
              <MobileDialog
                addLabelToTable={addLabelToTable}
                onHasModifiedLabels={setHasModifiedLabels}
              />
            </div>

            {/* Next & Back Button */}
            <span className="mt-5 flex justify-between">
              <Reveal>
                <ReturnProcessBackButton />
              </Reveal>
              <Reveal>
                <ReturnProcessNextButton />
              </Reveal>
            </span>
          </ReturnProcessRoot>
        </form>
      </Form>
    </>
  )
}
