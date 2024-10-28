'use client'
import React, { useEffect, useState } from "react";
import Header from "../_components/_header";
import { CircleDollarSign, RefreshCw, SearchIcon, ShoppingBag } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SiVerizon } from "react-icons/si";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import Order from "../_components/_order";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "../services/apiClient";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import LoaderModal from "../_components/loaderModal";
import { Dialog,DialogClose,DialogContent } from "@/components/ui/dialog";
import Charts from "./chart";

interface Order {
  id: string;
  created_at: string; // ou Date, dependendo de como você quer trabalhar com isso
  table: number;
   name: string;
    
   
  // adicione outras propriedades que você espera
}


function Teste() {

  const {toast} = useToast()
const [orders,setOrders]= useState<Order[]>([])
const [loading,setLoading] = useState(false)
const now = new Date()
async function getOrders(){
  setLoading(true)
  await api('/orders')
  .then((res)=> {
    setOrders(res.data)
    setLoading(false)
  })
  .catch((error)=> {
toast({
  title:'Erro ao buscar os pedidos',
  variant:'destructive'
})
setLoading(false)
  })
}

useEffect(()=> {
  getOrders()
},[])




// funcao para buscar novos pedidos de 30 em 30 segundos

useEffect(()=> {
setInterval(()=> {
  getOrders()
},30000)

},[])

// funcao para calcular todas as vendas nas ultimas 24 horas.
//pega a quantidade total de pedidos nas ultimas 24 horas

const vendasUltimas24Horas = orders.filter(orders => {
  const createdAt = new Date(orders?.created_at);
  const diff = now.getTime() - createdAt.getTime();
  const diffHours = diff / (1000 * 60 * 60);
  return diffHours <= 24;
});

// Número de vendas nas últimas 24 horas
const numberOrders = vendasUltimas24Horas.length;


  return (
    <div className="w-full h-full text-black bg-slate-100">
      <head>
        <title>Pedido Fácil - Dashboard</title>
      </head>
      <Toaster/>
      <Header />
      <div className="max-md:mx-4 mx-20 flex">
        <div className="mx-4 mt-4">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-[1.2rem]">Meus Pedidos</h1>
          
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Buscar pedido por mesa ou cliente..."
              className="max-w-[30rem]"
            />
            <Button size={"icon"} className="bg-[#449cd4]">
              <SearchIcon />
            </Button>
          </div>

          <div className="my-4 flex gap-10 max-md:flex-col mx-4">

         

            <Card className="bg-white w-full max-w-[30rem] h-[80vh] rounded-sm overflow-auto px-0">
              <div>
                <div className="sticky top-0 bg-white">
                  <div className="flex flex-col items-center border-b py-2 bg-amber-300 text-white">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-[1.2rem]">
                        Pedidos em preparo
                      </h2>
                     <div className="bg-white w-6 h-6 flex items-center justify-center  rounded-full text-black">
                    <p>{orders.length}</p>
                     </div>
                    </div>
                    <p className="text-xs text-center">
                      Veja os pedidos que estão sendo preparados para seus
                      clientes.
                    </p>
                  </div>
                </div>
                {orders.length === 0 ? (
                  <div className="flex flex-col items-center mt-20">
                    <Image
                      src={"/caixa-vazia.png"}
                      width={120}
                      height={120}
                      alt="sem pedidos"
                      objectFit="cover"
                    />
                    <p className="text-sm">Sem pedidos no momento!</p>
                  </div>
                ) : (
                  <Order data={orders} />
                )}
              </div>
            </Card>
            <Card className="bg-white w-full max-w-[30rem] h-[80vh] rounded-sm overflow-y-auto">
              <div>
                <div className="bg-white sticky top-0">
                  <div className="bg-green-300 w-full h-2 rounded-t-sm border-b flex flex-col items-center justify-center"></div>
                  <div className="flex flex-col items-center mx-3 border-b py-2">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-[1.2rem]">
                        Pedidos Concluídos
                      </h2>
                      <SiVerizon size={20} className="text-green-300" />
                    </div>
                    <p className="text-xs">
                      Pedidos prontos para serem retirados pelos garçons.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
            <div className="flex flex-col gap-10 max-md:hidden">
            <Card className="w-[20rem]">
                <CardContent className="flex flex-col items-center  py-2 ">
                  <div className="flex w-full justify-between ">
                    <div>
                     <h3 className={`text-[#449cd4] text-[2rem] font-semibold`}>{numberOrders}</h3>
                    <p className="text-muted-foreground">Vendas nas útimas 24hrs</p>    
                    </div>
                 <ShoppingBag size={35} className="text-muted-foreground opacity-60"/>
                  </div>

                </CardContent>
              </Card>

              {/** <Card className="w-[20rem]">
                <CardContent className="flex flex-col items-center  py-2 ">
                  <div className="flex w-full justify-between ">
                    <div>
                     <h3 className={`text-[#449cd4] text-[2rem] font-semibold`}>R$24560,00</h3>
                    <p className="text-muted-foreground">Valor total nas útimas 24hrs</p>    
                    </div>
                 <CircleDollarSign size={35} className="text-muted-foreground opacity-60"/>
                  </div>

                </CardContent>
              </Card> */}
             

            
            </div>
          </div>
        </div>
      </div>

      <Dialog open={loading}  >
        
        <DialogContent className="w-auto">
          <LoaderModal textLoad="Buscando pedidos..."/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Teste;
