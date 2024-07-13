import React from "react";
import Header from "../_components/_header";
import { RefreshCw, SearchIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SiVerizon } from "react-icons/si";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Image from "next/image";
import Order from "../_components/_order";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { Container } from './styles';

function teste() {
  const pedidos = [
    {
      numeroMesa: 1,
      itens: [
        { nome: "Hambúrguer", quantidade: 2, valorUnitario: 15.0 },
        { nome: "Batata Frita", quantidade: 1, valorUnitario: 10.0 },
        { nome: "Refrigerante", quantidade: 2, valorUnitario: 5.0 },
      ],
      nomeCliente: "João da Silva",
      valorTotal: 50.0,
    },
    {
      numeroMesa: 3,
      itens: [
        { nome: "Pizza", quantidade: 1, valorUnitario: 30.0 },
        { nome: "Salada", quantidade: 1, valorUnitario: 10.0 },
        { nome: "Suco", quantidade: 2, valorUnitario: 1.25 },
      ],
      nomeCliente: "Maria Oliveira",
      valorTotal: 42.5,
    },
    {
      numeroMesa: 2,
      itens: [
        { nome: "Sushi", quantidade: 3, valorUnitario: 12.0 },
        { nome: "Sashimi", quantidade: 2, valorUnitario: 8.0 },
        { nome: "Chá Verde", quantidade: 4, valorUnitario: 3.0 },
      ],
      nomeCliente: "Pedro Souza",
      valorTotal: 65.0,
    },
  ];

  return (
    <div className="w-full h-[100%] text-black bg-slate-100 ">
        <head>
            <title>Pedido Fácil - Dashboard</title>
        </head>
      <Header />
      <div className="max-md:mx-4 mx-40">
        <div className="mx-4 mt-4 ">
          <div className="flex items-center gap-2">
            <h1 className="font-semibold text-[1.2rem]">Meus Pedidos</h1>
            <RefreshCw
              size={20}
              className="cursor-pointer hover:text-[#449cd4] hover:animate-spin duration-300 "
            />
          </div>
          <div className="flex items-center gap-2">
            <Input placeholder="Buscar pedido por mesa ou cliente..." 
            className="max-w-[30rem]"
            />
            <Button size={'icon'} className="bg-[#449cd4]">
              <SearchIcon />  
            </Button>
            
          </div>

          <div className="my-4 grid grid-cols-2   gap-10 max-md:grid-cols-1 ">
            <Card className="bg-white w-full h-[80vh] rounded-sm overflow-auto ">
              <div>
                {/**header */}
                <div className="sticky top-0 bg-white">
                  <div className="bg-amber-300 w-full h-2 rounded-t-sm border-b  items-center justify-center "></div>
                  <div className="flex flex-col items-center mx-3  border-b py-2">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-[1.2rem]">
                        Pedidos em preparo
                      </h2>
                      <AiOutlineLoading3Quarters
                        size={20}
                        className="text-amber-300"
                      />
                    </div>

                    <p className="text-sm">
                      Veja os pedidos que estão sendo preparados para seus
                      clientes.
                    </p>
                  </div>
                </div>
                {pedidos.length === 0 ? (
                  <div className="flex flex-col items-center mt-20 ">
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
                  <Order data={pedidos} />
                )}
              </div>
            </Card>
            <Card className="bg-white-400 w-full h-[80vh] rounded-sm bg-white overflow-y-auto">
              <div>
                {/**header */}
                <div className="bg-white sticky top-0">
                  <div className="bg-green-300 w-full h-2  rounded-t-sm border-b flex flex-col items-center justify-center "></div>
                  <div className="flex flex-col items-center mx-3  border-b py-2">
                    <div className="flex items-center gap-2">
                      <h2 className="font-semibold text-[1.2rem]">
                        Pedidos Concluídos
                      </h2>
                      <SiVerizon size={20} className="text-green-300" />
                    </div>

                    <p className="text-sm">
                      Pedidos prontos para serem retirados pelos garçons.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default teste;
