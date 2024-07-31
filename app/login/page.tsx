"use client";
import { useState, useContext, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import Colors from "./../../lib/colors.json";
import { contextAuth } from "../context";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { singIn } = useContext(contextAuth);

  async function handleLogin(event: FormEvent) {
    setLoading(true);
    event.preventDefault();
    if (email !== "" && password !== "") {
      let data = {
        email,
        password,
      };
      singIn(data).finally(() => setLoading(false));
    } else {
      toast({
        title: "Preencha os campos vazios",
      });
      setLoading(false);
    }
  }
  return (
    <div className="bg-white w-full flex max-lg:flex-col  max-lg:items-center">
      <Toaster />
      <head>
        <title>Pedido Fácil - Faça seu login</title>
      </head>

      <div className=" w-[50vw] h-[100vh] flex flex-col justify-center">
        <div>
          <div className=" flex flex-col">
            <div className="flex flex-col items-center justify-center my-4">
              <Image
                src={"/logo.png"}
                alt="logo pedido facil"
                width={200}
                height={200}
                quality={100}
              />
              <h2 className="font-semibold text-lg">Autenticação</h2>
            </div>

            <form
              className=" flex flex-col items-center "
              onSubmit={handleLogin}
            >
              <div className="flex flex-col gap-5 w-full items-center px-8  ">
                <Input
                  placeholder="Digite seu email"
                  className="  rounded-sm max-w-[40rem] max-md:w-[25rem]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="Digite sua senha"
                  className=" rounded-sm max-w-[40rem] max-md:w-[25rem]"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <Button
                  className={`bg-[${Colors.blue}] hover:bg-blue-500 duration-300 rounded-sm w-full max-w-[40rem] max-md:w-[25rem]`}
                  type="submit"
                >
                  {loading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    " Login"
                  )}
                </Button>
                <p className="text-center text-sm">
                  Ainda não possui uma conta?{" "}
                  <Link href={"/register"} className="font-semibold">
                    Cadastre-se
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
};

export default Login;
