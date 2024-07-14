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
  } from "@/components/ui/dialog"
  

const Categories = () => {
  const { toast } = useToast();
  const [categoriesList, setCategoriesList] = useState([]);
  const [open,setOpen] = useState(true)

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

  return (
    <div className="w-full">
      <Toaster />
      <head>
        <title>Pedido Fácil - Nova Categoria</title>
      </head>

      <div className=" my-4 mx-40 max-md:mx-4">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-[1.2rem]">Categorias</h1>
          <Button
            className={`bg-[${Colors.blue}] hover:bg-blue-500 duration-300`}
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
              {categoriesList.map((item : {id:string, name:string}) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
<div className="flex items-center justify-center">

         <Dialog open={open} >
<DialogTrigger>
    Nova categoria
</DialogTrigger>
      </Dialog> 
</div>

    </div>
  );
};

export default Categories;
