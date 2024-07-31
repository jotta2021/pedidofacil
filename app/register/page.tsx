"use client";
import React, { FormEvent, useState, useContext } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { contextAuth } from "../context";
import Colors from "../../lib/colors.json";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { LoaderCircle } from "lucide-react";
// import { Container } from './styles';

function Register() {
  const { singIn } = useContext(contextAuth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const { Register } = useContext(contextAuth);

  async function handleRegister(event: FormEvent) {
    event.preventDefault();
    if (name !== "" && email !== "" && password !== "") {
      setLoading(true);
      const data = {
        name,
        email,
        password,
      };
      Register(data).finally(() => {
        setLoading(false);
      });
    } else {
      toast({
        title: "Preencha os campos vazios",
      });
    }
  }

  return (
    <div className="bg-white w-full flex max-lg:flex-col  max-lg:items-center">
      <head>
        <title>Pedido Fácil - Cadastro</title>
      </head>
      <Toaster />
      <div className=" w-[50vw] h-[100vh] flex flex-col justify-center">
        <div className=" w-full h-[100vh] flex flex-col justify-center">
          <div className=" flex flex-col">
            <div className="flex flex-col items-center justify-center my-4 ">
              <Image
                src={"/logo.png"}
                alt="logo pedido facil"
                width={200}
                height={200}
                quality={100}
              />
              <h2 className="font-semibold text-lg">Crie sua conta</h2>
            </div>

            <form
              className=" flex flex-col items-center "
              onSubmit={handleRegister}
            >
              <div className="flex flex-col gap-5 w-full items-center px-8  ">
                <Input
                  placeholder="Diigte seu nome"
                  className=" rounded-sm max-w-[40rem] max-md:w-[25rem]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  placeholder="Diigte seu email"
                  className=" rounded-sm max-w-[40rem] max-md:w-[25rem]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Diigte sua senha"
                  className=" rounded-sm max-w-[40rem] max-md:w-[25rem]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                className={`bg-[${Colors.blue}] hover:bg-blue-500 duration-300 rounded-sm w-full max-w-[40rem] max-md:w-[25rem]`}
                  onClick={handleRegister}
                >
                  {loading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    "Cadastrar"
                  )}
                </Button>
                <p className=" text-center text-sm">
                  Já possui uma conta?{" "}
                  <Link href={"/login"} className="font-semibold">
                    Entre agora
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className={`w-[50vw] h-[100vh] bg-[${Colors.blue}] flex items-center justify-center max-lg:hidden px-3`} >

<div className="flex flex-col items-center justify-center mx-3">
<Image
                src={"/pedido-online.png"}
                alt="logo pedido facil"
                width={200}
                height={200}
                quality={100}
              />
              <h2 className="text-white font-semibold text-[1.8rem] text-center">Bem-vindo ao Gerenciador de Pedidos!</h2>
              <p className="text-white text-center">Acesse seu painel para acompanhar pedidos, gerenciar produtos e otimizar o atendimento no seu restaurante.</p>
</div>
      </div>
    </div>
  );
}

export default Register;
