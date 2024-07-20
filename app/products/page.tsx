"use client";

import { Button } from "@/components/ui/button";
import Head from "next/head";
import Colors from "../../lib/colors.json";
import React, { FormEvent, useEffect, useRef, useState } from "react";
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
import { FcAddImage } from "react-icons/fc";
import { canSSRAuth } from "../utils/canSSRAuth";
import { setupApiConfig } from "../services/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import CurrencyInput from "react-currency-input-field";
import FormatCurrency from "../helpers/formatCurrency";
const Products = () => {
  const { toast } = useToast();
  const [ProductsList, setProductsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const inputFile = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [value, setValue] = useState<string | undefined>('');
  const [description,setDescription] = useState<string>('');
  const [categorySelect,setCategorySelect] = useState<string>('');
  const [name,setName] =  useState<string>('')
  type ProductProps = {
    name: string;
    price: number;
    id: string;
    banner: string;
    description: string;
    category: {
      name: string;
    };
  };

  type CategoriesProps = {
    id: string;
    name: string;
  };
  //busca as categorias da api
  async function getProducts() {
    await api
      .get("/products")
      .then((res) => {
        setProductsList(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        toast({
          title: "Erro ao buscar produtos do cardápio",
          variant: "destructive",
        });
        console.log(error);
      });
  }

  async function getCategories() {
    await api
      .get("/categories")
      .then((res) => {
        setCategoriesList(res.data);
      })
      .catch((error) => {
        toast({
          title: "Erro ao categorias",
          variant: "destructive",
        });
      });
  }
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  useEffect(() => {}, []);

  // funcao para pegar a imagem do input
  function getImage() {
    inputFile.current!.click();
  }
  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e?.target?.files[0];
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  }
  const handleValueChange = (value: string | undefined, name?: string) => {
    setValue(value);
  };

useEffect(()=>{
if(categorySelect!=='' && description!=='' && value!=='' && name!==''){
  setDisabled(false)
}else{
  setDisabled(true)
}

},[categorySelect, description,  value,name])

  async function addProduct(e: FormEvent){
    e.preventDefault()
    const formatNumber: string = value ? value.replace(',', '.') : '';
    if(categorySelect!=='' && description!=='' && value!=='' && name!==''){
const data = new FormData(); 

data.append('name', name);
data.append('price', formatNumber);
data.append('category_id', categorySelect);
if (imageFile) {
  data.append('file', imageFile);
}

data.append('description', description);

console.log(data)
await api.post('/addProduct', data)
.then((res)=> {
  toast({
    title:'Obaa! novo produto cadastrado'
  })
  setOpen(false)
  getProducts()
})
.catch((error)=> {
  toast({
    title:'Opss! erro ao cadastrar produto',
    variant:'destructive'
  })
  console.log(error)
})

    }else{
      toast({
        title:'Preencha os campos vazios '
      })
    }
  }
  return (
    <div className="w-full ">
      <Toaster />
      <head>
        <title>Pedido Fácil - Cardápio</title>
      </head>
      <Header />
      <div className=" my-4 mx-40 max-md:mx-4 bg-white px-3 py-3 rounded-md" >
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-[1.2rem]">Cardápio</h1>
          <Button
            className={`bg-[${Colors.blue}] hover:bg-blue-500 duration-300`}
            onClick={() => setOpen(true)}
          >
            Novo produto
          </Button>
        </div>
        <div className="my-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imagem</TableHead>
                <TableHead>Produto</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Preço</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ProductsList.length > 0 &&
                ProductsList.map((item: ProductProps) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="relative w-20 h-20 rounded-sm bg-white">
                         <Image
                        src={`https://pizzariaapi.onrender.com/files/${item.banner}`}
                        alt={item.name}
                      fill
                        className='object-cover w-full rounded-md'
                      />
                      </div>
                     
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>{FormatCurrency(item.price) }</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-center w-10">
        <Dialog open={open} onOpenChange={setOpen}  >
          <DialogContent className="w-[80vw]">
            <DialogHeader className="font-semibold">
              Adicione um novo produto
            </DialogHeader>
            <div className="flex flex-col  justify-center gap-2 ">
              <form className="flex flex-col gap-4">
                <div className="w-full h-52 border flex items-center justify-center relative rounded-sm">
                  <FcAddImage
                    size={60}
                    className="cursor-pointer absolute z-50"
                    onClick={getImage}
                  />
                  {imageFile !== null && (
                    <Image
                      src={imageUrl}
                      className="w-full h-full object-cover opacity-80 rounded-sm"
                      fill
                      alt="image"
                    />
                  )}

                  <input
                    type="file"
                    ref={inputFile}
                    onChange={(e) => handleImage(e)}
                    className="hidden"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Nome</label>
                  <Input placeholder="Digite o nome do produto" 
                  value={name}
                  
                  onChange={(e)=> setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Categoria</label>
                  <Select value={categorySelect} onValueChange={setCategorySelect}> 
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                      <SelectContent>
                        <SelectGroup>
                          {categoriesList.map((item: CategoriesProps) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                </div>
                <div className="flex flex-col gap-1">
                  <label>Preço</label>
                  <CurrencyInput
                  className="border py-2 rounded-sm px-2 text-sm"
                    id="currency-input"
                    name="currency-input"
                    placeholder="Digite um valor"
                    defaultValue={value}
                    decimalsLimit={2}
                    onValueChange={handleValueChange}
                    intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Descrição do produto</label>
                  <textarea
                    placeholder="Descreva o seu produto..."
                    className="border px-2 text-sm"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                  />
                </div>
                <Button
                  className={`bg-[${Colors.blue}] mx-8`}
                  disabled={disabled}
                  onClick={addProduct}
                >
                  Confirmar
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Products;
