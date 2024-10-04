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
import { Card, CardContent } from "@/components/ui/card";
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
    <div className={`bg-[${Colors.blue}] w-full h-screen flex flex-col items-center justify-center`}

    >
      <Toaster />
      <head>
        <title>Pedido Fácil - Faça seu login</title>
      </head>



      <Card className="w-[40%] max-md:w-[80%]  flex flex-col  items-center justify-center  px-4">
        <CardContent className="w-full">
          <div className="flex flex-col items-center justify-center my-4">
            <div className="flex flex-col items-center justify-center my-4">
              <Image
                src={"/pedido-online.png"}
                alt="logo pedido facil"
                width={100}
                height={100}
                quality={100}
              />
              <p>Bem vindo ao Pedido Fácil</p>
            </div>


            <h2 className="font-semibold text-lg">Cadastro de usuário</h2>
          </div>

          <form
            className=" flex flex-col   w-full"
            onSubmit={handleRegister}
          >
            <div className="flex flex-col gap-5 w-full ">
              <Input
                placeholder="Digite seu nome"
                className="  rounded-sm w-full "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                placeholder="Digite seu email"
                className="  rounded-sm w-full "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Crie uma senha"
                className=" rounded-sm  w-full"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                className={`bg-[${Colors.blue}] hover:bg-blue-500 duration-300 rounded-sm w-full `}
                type="submit"
              >
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  " Criar conta"
                )}
              </Button>

            </div>
          </form>
          <p className="text-center text-sm mt-4">
            Já possui uma conta?{" "}
            <Link href={"/login"} className="font-semibold">
              Entrar agora mesmo
            </Link>
          </p>
        </CardContent>

      </Card>
    </div>
  );
}

export default Register;