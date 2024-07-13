import { Button } from "@/components/ui/button"
import { EllipsisVertical } from "lucide-react"
import { Card } from "@/components/ui/card"

interface OrderProps {
    data: {
        numeroMesa:number,
        nomeCliente:string,
        valorTotal:number
    }[]
}

const Order = ({data}: OrderProps) => {

    const formatCurrency = (value: number) => {
        const formatNumber = Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            style: 'currency'
        }).format(Number(value))
        return formatNumber;
    }
    return (
        <div className='flex flex-col gap-4 my-4 mx-3 '>
            <p className='text-sm font-semibold'>Total de pedidos: {data.length}</p>
            {
                data.map((item, index) => (
                    <Card key={item.numeroMesa} className='bg-slate-50 p-2' >
                        <div className='flex  mx-3 my-2 justify-between border-b '>

                            <h3 className='font-semibold' >Mesa {item.numeroMesa}</h3>


                            <EllipsisVertical size={20} className='text-slate-600 cursor-pointer' />
                        </div>
                        <div className='mx-3 '>
                            <p className='text-xs'>Cliente: {item.nomeCliente}</p>
                            <p className='font-semibold text-sm'>Total: {formatCurrency(item.valorTotal)}</p>
                        </div>
                        <div className='flex items-center justify-center my-4 w-full'>
                            <Button className='w-full bg-[#449cd4]'>Concluir Pedido</Button>
                        </div>

                    </Card>
                ))
            }

        </div>
    )
}
 
export default Order;