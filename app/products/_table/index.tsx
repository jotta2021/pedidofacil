import React, { Dispatch, SetStateAction } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  } from "@tanstack/react-table";
import Image from 'next/image';
import FormatCurrency from '@/app/helpers/formatCurrency';
import { Button } from '@/components/ui/button';
import { Edit, EllipsisVertical, Trash } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ProductProps {
  name: string;
  price: number;
  id: string;
  banner: string;
  description: string;
  category: {
    name: string;
   id:string;
  };
}


interface TableProductsProps {
  ProductsProps: ProductProps[];
  DeleteProduct: (id: string)=> void;
  selectProduct:ProductProps | null;
  setSelectProduct: (product:ProductProps)=>void;
  setOpen: Dispatch<SetStateAction<boolean>>; 
  
}



const TableProducts: React.FC<TableProductsProps> = ({ ProductsProps , DeleteProduct,selectProduct,setSelectProduct,setOpen}) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  console.log(ProductsProps)
  const data = ProductsProps;
  const columns: ColumnDef<ProductProps>[] = [
    {
      accessorKey: "banner",
      header: "Imagem",
      cell: ({ row }) => (
        <div className="relative w-20 h-20">
          <Image
            src={`http://localhost:3333/files/${row.getValue("banner")}`}
            alt={row.getValue("name")}
            fill
            className="object-cover rounded-md"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Produto",
      cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "name", // Corrigido para acessar o nome da categoria diretamente
      header: "Categoria",
      cell: ({ row }) => <div className="capitalize">{row.original.category.name}</div>,
    },
    {
      accessorKey: "description",
      header: "Descrição",
      cell: ({ row }) => <div className="capitalize">{row.getValue("description")}</div>,
    },
    {
      accessorKey: "price",
      header: "Preço",
      cell: ({ row }) => <div>{FormatCurrency(row.getValue("price"))}</div>,
    },
    {
      accessorKey: "menu",
      header: "",
      cell: ({ row }) => <div>
          <Popover>
            <PopoverTrigger>     <EllipsisVertical /></PopoverTrigger>
            <PopoverContent className='items-center justify-center flex gap-2'>
              <Button variant={'ghost'} className='gap-2 border text-blue-500 hover:text-blue-600 duration-300'
              onClick={()=> {
                setSelectProduct(row.original)
                setOpen(true)
              }}
              >
                <Edit size={18}/>
                <p>Editar</p>
              </Button>
              <Button variant={'ghost'} className='gap-2 border text-red-500 hover:text-red-600 duration-300'
              onClick={()=>{
               
                DeleteProduct(row.original.id)}}
              >
                <Trash size={18}/>
                <p>Deletar</p>
              </Button>
            </PopoverContent>
     
          </Popover>
      </div>,
    },
  ];
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>

    
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
    <div className="flex items-center justify-end space-x-2 py-4">
    
     <div className="space-x-2">
       <Button
         variant="outline"
         size="sm"
         onClick={() => table.previousPage()}
         disabled={!table.getCanPreviousPage()}
       >
         Anterior
       </Button>
       <Button
         variant="outline"
         size="sm"
         onClick={() => table.nextPage()}
         disabled={!table.getCanNextPage()}
       >
         Próximo
       </Button>
     </div>
     </div>
</div>
     
  );
};

export default TableProducts;
