"use client";

import { Button } from "@/components/ui/button";
import Head from "next/head";
import Colors from "../../lib/colors.json";
import { useEffect, useState } from "react";
import { api } from "../services/apiClient";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Header from "../_components/_header";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import LoaderModal from "../_components/loaderModal";
const Categories = () => {
  const { toast } = useToast();
  const [categoriesList, setCategoriesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [category, setCategory] = useState("");
  const [loading,setLoading] = useState(false)
  const [loaderNew,setLoaderNew] = useState(false)
  //busca as categorias da api

  async function getCategories() {
    setLoading(true)
    await api
      .get("/categories")
      .then((res) => {
        setCategoriesList(res.data);
        setLoading(false)
      })
      .catch((error) => {
        toast({
          title: "Erro ao buscar categorias",
          description: error,
          variant: "destructive",
        });
        setLoading(false)
      });
  }
  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (category !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [category]);

  async function AddCategory() {
    if (category !== "") {
      const data = {
        name: category,
      };
      setLoaderNew(true)
      const response = await api
        .post(`/addCategory`, data)
        .then((res) => {
          toast({
            title: "Uhu! nova categoria adicionada.",
          });
          setOpen(false);
          setCategory("");
          getCategories();
          setLoaderNew(false)
        })
        .catch((error) => {
          toast({
            title: "Erro ao adicionar categoria",
            description: error,
            variant: "destructive",
          });
          setLoaderNew(false)
        });
    }
  }

  return (
    <div className="w-full">
      <Toaster />
      <head>
        <title>Pedido Fácil - Nova Categoria</title>
      </head>
      <Header />
      <div className=" my-4 mx-40 max-md:mx-4 bg-white px-3 py-3 rounded-md">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-[1.2rem]">Categorias</h1>
          <Button
            className={`bg-[${Colors.blue}] hover:bg-blue-500 duration-300`}
            onClick={() => setOpen(true)}
          >
            Nova categoria
          </Button>
        </div>

        {categoriesList.length === 0 ? (
          <div className="flex flex-col items-center mt-20">
            <Image
              src={"/caixa-vazia.png"}
              width={120}
              height={120}
              alt="sem pedidos"
              objectFit="cover"
            />
            <p className="text-sm">Sem categorias no momento!</p>
          </div>
        ) : (
          <div className="my-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome - Categoria</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categoriesList.length > 0 &&
                  categoriesList.map((item: { id: string; name: string }) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-[80vw]">
            <DialogHeader className="font-semibold">
              Adicione uma nova categoria
            </DialogHeader>
            <div className="flex flex-col  justify-center gap-2 w-full">
              <div className="flex flex-col gap-1">
                <label>Categoria</label>
                <Input
                  placeholder="Digite o nome da categoria"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <Button
                className={`bg-[${Colors.blue}] mx-8 hover:bg-blue-600`}
                onClick={AddCategory}
                disabled={disabled}
              >
                {
                  loaderNew?
                  <LoaderCircle className='animate-spin'/> :
                  'Confirmar'
                }
                
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={loading}  >
        
        <DialogContent className="w-auto">
          <LoaderModal textLoad="Buscando categorias..."/>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Categories;
