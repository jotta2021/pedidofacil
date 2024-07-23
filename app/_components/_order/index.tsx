import { Button } from "@/components/ui/button"
import { EllipsisVertical } from "lucide-react"
import { Card } from "@/components/ui/card"

interface OrderProps {
    data: {
        table:number,
        name:string,
        valorTotal:number,
        id:string
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
                    <Card key={item.id} className='bg-slate-50 p-2' >
                        <div className='flex  mx-3 my-2 justify-between border-b '>

                            <h3 className='font-semibold' >Mesa {item.table}</h3>


                            <EllipsisVertical size={20} className='text-slate-600 cursor-pointer' />
                        </div>
                        <div className='mx-3 '>
                            <p className='text-xs'>Cliente: {item.name.toUpperCase()}</p>
                            <p className='font-semibold text-sm'>Total: </p>
                        </div>
                        <div className='flex items-center justify-center my-4 w-full'>
                            <Button className='w-full bg-[#449cd4] hover:bg-blue-600'>Concluir Pedido</Button>
                        </div>

                    </Card>
                ))
            }

        </div>
    )
}
 
export default Order;