
'use client'
import { Button } from "@/components/ui/button"
import { EllipsisVertical } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Dialog,DialogContent,DialogHeader } from "@/components/ui/dialog"
import { useEffect, useState } from "react"
import { api } from "@/app/services/apiClient"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import {format} from 'date-fns'


interface OrderProps {
    data: {
        table:number,
        name:string,
        id:string,
        created_at:Date
    }[]
}
interface orderDetail {
    id:string,
    amoun: number,
    product:{
        name: string,
        price: number
    },
    order:{
        created_at: Date,
        name:string,
        table:number
    }
}

const Order = ({data}: OrderProps, {id,amoun,product} : orderDetail) => {





const [openDialog,setOpenDialog] = useState(false)
const [orderDetail,setOrderDetails] = useState<orderDetail[]>([]);
const [selectOrder,setSelectOrder]= useState([])
const {toast} = useToast()
    const formatCurrency = (value: number) => {
        const formatNumber = Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            style: 'currency'
        }).format(Number(value))
        return formatNumber;
    }

// busca os detalhes do pedido de acordo com o is
async function getDetailsOrder(id: string){
    console.log(`orderDetail?order_id=${id}`)
    await api.get(`orderDetail?order_id=${id}`)
    .then((res)=> {
setOrderDetails(res.data)
    })
    .catch((error)=> {
toast({
    title:'Erro ao buscar detalhes do pedido',
    variant:'destructive'
})
    })
}


// funcao para calcular o valor total dos itens da mesa
const calculateTotal = (items:orderDetail[]) => {
    return items.reduce((total, item) => {
      return total + (item.amoun * item.product.price);
    }, 0);
  };

// funcao para formatar a data
const FormatDate = (value : Date) => {
    const date = format(value, 'dd/MM/yyyy HH:mm:ss')
    return date;
}

  const total = calculateTotal(orderDetail)
    return (
        <div className='flex flex-col gap-4 my-4 mx-3 '>
            <Toaster/>
            <p className='text-sm font-semibold'>Total de pedidos: {data.length}</p>
            {
                data.map((item, index) => (
                    <Card key={item.id} className='bg-slate-50 p-2' >
                        <div className='flex  mx-3 my-2 justify-between border-b '>

                            <h3 className='font-semibold' >Mesa {item.table}</h3>
<Popover>
    <PopoverTrigger>
        <Button size={'icon'} variant={'ghost'}
        onClick={()=> getDetailsOrder(item.id)}
        ><EllipsisVertical size={20} className='text-slate-600 cursor-pointer' /></Button>
    </PopoverTrigger>
    <PopoverContent>
      
            <p className="text-sm cursor-pointer" onClick={()=> setOpenDialog(true)}>Vizualizar pedido</p>
      
        
    </PopoverContent>
</Popover>

                       
                        </div>
                        <div className='mx-3 '>
                            <p className='text-xs'>Cliente: {item.name.toUpperCase()}</p>
                       
                        </div>
                        <div className='flex items-center justify-center my-4 w-full'>
                            <Button className='w-full bg-[#449cd4] hover:bg-blue-600'>Concluir Pedido</Button>
                        </div>

                    </Card>
                ))
            }


<Dialog open={openDialog} onOpenChange={setOpenDialog}>
<DialogContent className="w-[60vw] h-auto">
   
<div className="">
 
    {orderDetail.map((item: orderDetail)=> (
        <div key={item.id}>
 <DialogHeader 
    className="font-semibold text-[1.2rem] border-b py-4">Detalhes do pedido  -  Mesa {item.order.table}
       <p className="text-sm"> Realizado em: {FormatDate(item.order.created_at)}</p>
       <p className="text-sm">Cliente: {item.order.name}</p>
    </DialogHeader>
        
        <div  className="flex gap-2 ">
<p>{item.amoun}-</p>
<p>{item.product.name} ({formatCurrency(item.product.price) } UN)</p>
        </div>
        
        </div>
    ))}

    <div className="my-8">
            <span className="bg-red-500 px-3 py-1  rounded-sm text-white font-semibold" >Valor total : {formatCurrency(total) } </span>
    </div>

</div>
</DialogContent>
</Dialog>
        </div>
    )
}
 
export default Order;