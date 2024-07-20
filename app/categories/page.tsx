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
const Categories = () => {
  const { toast } = useToast();
  const [categoriesList, setCategoriesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [disabled,setDisabled] = useState(true)
const [category,setCategory] = useState('')
  //busca as categorias da api

  async function getCategories() {
    await api
      .get("/categories")
      .then((res) => {
        setCategoriesList(res.data);
      })
      .catch((error) => {
        toast({
          title: "Erro ao buscar categorias",
          description: error,
          variant: "destructive",
        });
      });
  }
  useEffect(() => {
    getCategories();
  }, []);


  useEffect(()=> {
    if(category!==''){
      setDisabled(false)
    }else{
      setDisabled(true)
    }
  },[category])

  async function AddCategory(){
    if(category!==''){
       const data = {
      name:category
    }
    const response  =  await api.post(`/addCategory`,data)
    .then((res)=> {
      toast({
        title:'Uhu! nova categoria adicionada.',

      })
      setOpen(false)
      setCategory('')
      getCategories()
    })
    .catch((error)=> {
      toast({
        title: "Erro ao adicionar categoria",
        description: error,
        variant: "destructive",
      });
    })
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
            onClick={()=> setOpen(true)}
          >
            Nova categoria
          </Button>
        </div>
        <div className="my-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome - Categoria</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              { categoriesList.length> 0 && categoriesList.map((item: { id: string; name: string }) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Dialog open={open} onOpenChange={setOpen}>
          
          <DialogContent className="w-[80vw]">
            <DialogHeader className='font-semibold'>Adicione uma nova categoria</DialogHeader>
            <div className='flex flex-col  justify-center gap-2 w-full'>
              <div className="flex flex-col gap-1">
                 <label>Categoria</label>
              <Input
              placeholder="Digite o nome da categoria"
              value={category}
              onChange={(e)=> setCategory(e.target.value)}
              />
              </div>
             
              <Button className={`bg-[${Colors.blue}] mx-8`}
              onClick={AddCategory}
              disabled={disabled}
              >Confirmar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Categories;
