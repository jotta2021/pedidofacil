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
import { Card, CardContent } from "@/components/ui/card";

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
        title: "Preencha os campos vazios"
      });
      setLoading(false);
    }
  }
  return (
    <div className={`bg-[${Colors.blue}] w-full h-screen flex flex-col items-center justify-center`}

    >
      <Toaster />
      <head>
        <title>Pedido Fácil - Faça seu login</title>
      </head>



      <Card className=" w-[40%] max-md:w-[80%] flex flex-col  items-center justify-center  px-4">
        <CardContent className="w-full">
          <div className=" w-full flex flex-col items-center justify-center my-4">
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


            <h2 className="font-semibold text-lg">Autenticação</h2>
          </div>

          <form
            className=" flex flex-col   w-full"
            onSubmit={handleLogin}
          >
            <div className="flex flex-col gap-5 w-full ">
              <Input
                placeholder="Digite seu email"
                className="  rounded-sm w-full "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder="Digite sua senha"
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
                  " Login"
                )}
              </Button>

            </div>
          </form>
          <p className="text-center text-sm mt-4">
            Ainda não possui uma conta?{" "}
            <Link href={"/register"} className="font-semibold">
              Cadastre-se
            </Link>
          </p>
        </CardContent>

      </Card>
    </div>




  );
};

export default Login;