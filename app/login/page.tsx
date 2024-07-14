'use client'
import { useState,useContext, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import Colors from "./../../lib/colors.json";
import { contextAuth } from "../context";
import { LoaderCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { canSSRGuest } from "../utils/canSSRGuest";
const Login = () => {
  const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [loading,setLoading] = useState(false)
const {toast} = useToast()
const {singIn} = useContext(contextAuth)


async function handleLogin(event:FormEvent){

setLoading(true)
event.preventDefault()
if(email!=='' && password!==''){
let data = {
  email,
  password
}
  singIn(data)
  setLoading(false)
}else{

  toast({
    title:'Preencha os campos vazios'
  })
  setLoading(false)
}
}
  return (
    <div className='bg-white w-full'>
      <Toaster/>
      <head>
        <title>Pedido Fácil - Faça seu login</title>
      </head>

      <div className=" w-full h-[100vh] flex flex-col justify-center">
        <div className=" flex flex-col">
          <div className="flex items-center justify-center">
            <Image
              src={"/logo.png"}
              alt="logo pedido facil"
              width={300}
              height={300}
              quality={100}
            />
          </div>

          <form className=" flex flex-col items-center " onSubmit={handleLogin}>
            <div className="flex flex-col gap-5">
              <Input
                placeholder="Diigte seu email"
                className="max-md:w-[20rem] w-[30rem]"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
              <Input
                placeholder="Diigte sua senha"
                className="max-md:w-[20rem] w-[30rem]"
                type='password'
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />

              <Button className={`bg-[${Colors.blue}] hover:bg-blue-500 duration-300`}
              onClick={handleLogin}
              >
                {
                  loading ?
                  <LoaderCircle className='animate-spin'/> :

                  ' Login'
                }
               
              </Button>
              <p className="text-center text-sm">
                Ainda não possui uma conta?{" "}
                <Link href={"/register"} className="font-semibold">Cadastre-se</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>


  );
};

export default Login;


