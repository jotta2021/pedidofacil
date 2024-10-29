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
import { Loader, LoaderCircle, Search } from "lucide-react";
import LoaderModal from "../_components/loaderModal";
import SearchComponent from "../_components/SearchComponent";
import TableProducts from "./_table";

const Products = () => {
  const { toast } = useToast();
  const [ProductsList, setProductsList] = useState<ProductProps[]>([]);
  const [filteredList,setFilteredList] = useState<ProductProps[]>([])
  const [categoriesList, setCategoriesList] = useState([]);
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const inputFile = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [value, setValue] = useState<string | undefined>("");
  const [description, setDescription] = useState<string>("");
  const [categorySelect, setCategorySelect] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [search, setSearch] = useState("");
  const [selectProduct,setSelectProduct] = useState<ProductProps|null>(null);
  type ProductProps = {
    name: string;
    price: number;
    id: string;
    banner: string;
    description: string;
    category: {
      name: string;
      id:string;
    };
  };

  type CategoriesProps = {
    id: string;
    name: string;
  };
  //busca as categorias da api
  async function getProducts() {
    setLoadingProducts(true);
    await api
      .get("/products")
      .then((res) => {
        setProductsList(res.data);
        setFilteredList(res.data)
        console.log(res.data);
        setLoadingProducts(false);
      })
      .catch((error) => {
        toast({
          title: "Erro ao buscar produtos do cardápio",
          variant: "destructive",
        });
        setLoadingProducts(false);
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

 // funcao para buscar produtos
 async function SearchProducts(e: FormEvent){
  e.preventDefault()
const filteredItems = ProductsList.filter((item)=> item?.name.toUpperCase().includes(search.toUpperCase()))
if(filteredItems.length>0){
  setFilteredList(filteredItems)
}else{
  setFilteredList([])
}

 }

 useEffect(()=> {
  if(search===''){
    setFilteredList(ProductsList)
  }
 },[search])

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

  useEffect(() => {
    if (categorySelect !== "" && value !== "" && name !== "") {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [categorySelect, description, value, name]);

  async function addProduct(e: FormEvent) {
    e.preventDefault();
    const formatNumber: string = value ? value.replace(",", ".") : "";
    if (categorySelect !== "" && value !== "" && name !== "") {
      setLoading(true);
      const data = new FormData();

      data.append("name", name);
      data.append("price", formatNumber);
      data.append("category_id", categorySelect);
      if (imageFile) {
        data.append("file", imageFile);
      }

      data.append("description", description);

      console.log(data);
      await api
        .post("/addProduct", data)
        .then((res) => {
          toast({
            title: "Obaa! novo produto cadastrado",
          });
          setOpen(false);
          getProducts();
          setLoading(false);
          setName("");
          setValue("");
          setCategorySelect("");
          setDescription("");
          setImageFile(null);
          setImageUrl('')
        })
        .catch((error) => {
          toast({
            title: "Opss! erro ao cadastrar produto",
            variant: "destructive",
          });
          setLoading(false);
          console.log(error);
        });
    } else {
      toast({
        title: "Preencha os campos vazios ",
      });
    }
  }


  async function UpdateProduct(e: FormEvent) {
    e.preventDefault();
    const formatNumber: string = value ? value.replace(",", ".") : "";
    if (categorySelect !== "" && value !== "" && name !== "") {
      setLoading(true);
      const data = new FormData();

      data.append("name", name);
      data.append("price", formatNumber);
      data.append("category_id", categorySelect);
      if (imageFile) {
        data.append("file", imageFile);
      }else{
        data.append("banner", selectProduct?.banner)
      }
      data.append("description", description);

      console.log(data);
      await api
        .post(`/updateProduct?id=${selectProduct?.id}`, data)
        .then((res) => {
          toast({
            title: "Obaa!  produto atualizado",
          });
          setOpen(false);
          getProducts();
          setLoading(false);
          setName("");
          setValue("");
          setCategorySelect("");
          setDescription("");
          setImageFile(null);
          setImageUrl('')
        })
        .catch((error) => {
          toast({
            title: "Opss! erro ao atualizar produto",
            variant: "destructive",
          });
          setLoading(false);
          console.log(error);
        });
    } else {
      toast({
        title: "Preencha os campos vazios ",
      });
    }
  }
async function DeleteProduct(id:string){
  await api.delete(`/product/delete?id=${id}`)
  .then((res)=> {
    toast({
      title:'Produto deletado',
      variant:'default'
    })
    getProducts()
  })
  .catch((error) => {
    toast({
      title: "Opss! erro ao deletar produto",
      variant: "destructive",
    });
   console.log(error)
  });
}

// se tiver um produto selecionado
//preenche todos os campos

useEffect(()=> {
if(selectProduct && categoriesList.length>0){
  setName(selectProduct.name)
  setCategorySelect(selectProduct.category.id)
  setValue(selectProduct.price.toString())
  setDescription(selectProduct.description)

}else{
  setName('')
  setCategorySelect('')
  setValue('')
  setDescription('')
  
}

},[selectProduct, categoriesList])

  return (
    <div className="w-full h-screen ">
      <Toaster />
      <head>
        <title>Pedido Fácil - Cardápio</title>
      </head>
      <Header />
      <div className=" my-4 mx-40 max-md:mx-4 bg-white px-3 h-[90%] py-3 rounded-md">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-[1.2rem]">Cardápio</h1>
          <Button
            className={`bg-[${Colors.blue}] hover:bg-blue-500 duration-300`}
            onClick={() =>{setOpen(true)

              setSelectProduct(null)
            } }
          >
            Novo produto
          </Button>
        </div>

        {/** campo de pesquisa */}
        <form onSubmit={SearchProducts}>
           <SearchComponent search={search} setSearch={setSearch} onClick={()=> SearchProducts} />

        </form>
       
        {filteredList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Image
              src={"/caixa-vazia.png"}
              width={120}
              height={120}
              alt="sem pedidos"
              objectFit="cover"
            />
            <p className="text-sm">Sem produtos no momento!</p>
          </div>
        ) : (
          <div className="my-4">
          <TableProducts  ProductsProps={filteredList} DeleteProduct={DeleteProduct} selectProduct={selectProduct} setSelectProduct={setSelectProduct} setOpen={setOpen} />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center w-10">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-[80vw] h-[80vh] overflow-y-auto">
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
                  <Input
                    placeholder="Digite o nome do produto"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label>Categoria</label>
                  <Select
                    value={categorySelect}
                    onValueChange={setCategorySelect}
                  >
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
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                
                <Button
                  className={`bg-[${Colors.blue}] mx-8 hover:bg-blue-600`}
                  disabled={disabled}
                  onClick={(e)=>selectProduct? UpdateProduct(e) :addProduct(e)}
                >
                  {loading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Confirmar"
                  )}
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={loadingProducts}>
        <DialogContent className="w-auto">
          <LoaderModal textLoad="Buscando seus produtos..." />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
