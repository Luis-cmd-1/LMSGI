import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns3,
  PencilLine,
  SquarePen,
  Plus,
  Search,
  Trash2,
} from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps {
  api: () => Promise<any[]>
  deleteApi: (id: string) => Promise<any>
  EditFormComponent?: React.ComponentType<{ item: any; onSuccess: () => void }>
  InsertFormComponent?: React.ComponentType<{ onSuccess: () => void }>
  getId: (item: any) => string
  fields: string[]
  label: string
}

function createColumns(fields: string[]): ColumnDef<any>[] {
  return fields.map((field) => ({
    accessorKey: field,
    header: field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, " "),
  }))
}

export function DataTable({ api, deleteApi, EditFormComponent, InsertFormComponent, getId, fields, label }: DataTableProps) {
  const [data, setData] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)
  const [editItem, setEditItem] = React.useState<any>(null)
  const [deleteItems, setDeleteItems] = React.useState<any[]>([])
  const [insertOpen, setInsertOpen] = React.useState(false)

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const [globalFilter, setGlobalFilter] = React.useState("")

  const cargar = React.useCallback(() => {
    setLoading(true)
    api().then((result) => {
      setData(result || [])
      setLoading(false)
    })
  }, [api])

  React.useEffect(() => { cargar() }, [cargar])

  function openEdit(item: any) {
    setEditItem(item)
  }

  function onEditSuccess() {
    setEditItem(null)
    cargar()
  }

  function openInsert() {
    setInsertOpen(true)
  }

  function onInsertSuccess() {
    setInsertOpen(false)
    cargar()
  }

  const columns = React.useMemo(() => {
    const cols: ColumnDef<any>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={table.getIsAllPageRowsSelected()}
              onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        meta: { className: "w-0" },
      } as ColumnDef<any>,
      ...createColumns(fields),
      {
        id: "actions",
        header: () => <span className="sr-only">Acciones</span>,
        enableHiding: false,
        meta: { className: "w-0" },
        cell: ({ row }: { row: { original: any } }) => (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="size-8 p-0 text-muted-foreground" size="icon">
                <SquarePen className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              {EditFormComponent && (
                <DropdownMenuItem onClick={() => openEdit(row.original)}>
                  <PencilLine className="size-4" />
                  Editar
                </DropdownMenuItem>
              )}
              {EditFormComponent && <DropdownMenuSeparator />}
              <DropdownMenuItem variant="destructive" onClick={() => setDeleteItems([row.original])}>
                <Trash2 className="size-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      } as ColumnDef<any>,
    ]
    return cols
  }, [fields, EditFormComponent])

  const table = useReactTable({
    data,
    columns,
    state: { sorting, columnVisibility, rowSelection, columnFilters, pagination, globalFilter },
    getRowId: (_, index) => index.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-9 w-full pl-8"
            />
          </div>
          {InsertFormComponent && (
            <Button size="sm" className="text-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500/20 hover:bg-emerald-500/20 hover:cursor-pointer" onClick={openInsert}>
              <Plus />
              Insertar
            </Button>
          )}
          {EditFormComponent && table.getFilteredSelectedRowModel().rows.length === 1 && (
            <Button size="sm" className="text-blue-500 bg-blue-500/10 ring-1 ring-blue-500/20 hover:bg-blue-500/20 hover:cursor-pointer" onClick={() => openEdit(table.getFilteredSelectedRowModel().rows[0].original)}>
              <PencilLine />
              Editar
            </Button>
          )}
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button size="sm" className="text-rose-500 bg-rose-500/10 ring-1 ring-rose-500/20 hover:bg-rose-500/20 hover:cursor-pointer" onClick={() => {
              setDeleteItems(table.getFilteredSelectedRowModel().rows.map(r => r.original))
              table.resetRowSelection()
            }}>
              <Trash2 />
              {table.getFilteredSelectedRowModel().rows.length === 1 ? "Eliminar" : `Eliminar (${table.getFilteredSelectedRowModel().rows.length})`}
            </Button>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">
              <Columns3 />
              <span className="hidden lg:inline">Columnas</span>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {table.getAllColumns().filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide()).map((column) => (
              <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Cargando...
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={(cell.column.columnDef.meta as any)?.className}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No hay resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-1">
        <div className="hidden flex-1 text-sm text-muted-foreground lg:flex">
          {table.getFilteredRowModel().rows.length} registro(s) en total
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">Filas por página</Label>
            <Select value={`${table.getState().pagination.pageSize}`} onValueChange={(value) => table.setPageSize(Number(value))}>
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 30, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>{pageSize}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
              <span className="sr-only">Ir a primera página</span>
              <ChevronsLeft />
            </Button>
            <Button variant="outline" className="size-8" size="icon" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
              <span className="sr-only">Página anterior</span>
              <ChevronLeft />
            </Button>
            <Button variant="outline" className="size-8" size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <span className="sr-only">Página siguiente</span>
              <ChevronRight />
            </Button>
            <Button variant="outline" className="hidden size-8 lg:flex" size="icon" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
              <span className="sr-only">Ir a última página</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>

      <AlertDialog open={deleteItems.length > 0} onOpenChange={(open) => { if (!open) setDeleteItems([]) }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {deleteItems.length === 1
                ? `¿Eliminar "${deleteItems[0]?.[fields[0]]}"?`
                : `¿Eliminar ${deleteItems.length} registros?`
              }
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminarán permanentemente {deleteItems.length} {label.toLowerCase()}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              await Promise.all(deleteItems.map((item) => deleteApi(getId(item))))
              setDeleteItems([])
              cargar()
            }}>Eliminar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {EditFormComponent && (
        <Dialog open={!!editItem} onOpenChange={(open) => { if (!open) setEditItem(null) }}>
          <DialogContent className="sm:max-w-2xl ring-2 ring-blue-500/20">
            {editItem && <EditFormComponent item={editItem} onSuccess={onEditSuccess} />}
          </DialogContent>
        </Dialog>
      )}

      {InsertFormComponent && (
        <Dialog open={insertOpen} onOpenChange={setInsertOpen}>
          <DialogContent className="sm:max-w-2xl ring-2 ring-emerald-500/20">
            <InsertFormComponent onSuccess={onInsertSuccess} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
