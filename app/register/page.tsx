'use client'
import React, { FormEvent , useState} from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { useContext } from 'react';
import { contextAuth } from '../context';
// import { Container } from './styles';

function Register() {
  const {singIn} = useContext(contextAuth)
const [name,setName] = useState('')
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
async function handleLogin(event: FormEvent){
event.preventDefault()
if(name!=='' && email!=='' && password!==''){
 
}

}

  return (
 
  <div> 
      <head>
    <title>Pedido Fácil - Cadastro</title>
 </head>
  <div className=" w-full h-[100vh] flex flex-col justify-center">
  <div className=" flex flex-col">
    <div className="flex flex-col items-center justify-center my-4 ">
      <Image
        src={"/logo.png"}
        alt="logo pedido facil"
        width={300}
        height={300}
        quality={100}
      />
      <h2 className='text-white font-semibold text-lg'>Crie sua conta</h2>
    </div>

    <form className=" flex flex-col items-center " onSubmit={handleLogin}>
      <div className="flex flex-col gap-5">
      <Input
          placeholder="Diigte seu nome"
          className="max-md:w-[20rem] w-[30rem]"
          value={name}
          onChange={(e)=> setName(e.target.value)}
        />
        <Input
          placeholder="Diigte seu email"
          className="max-md:w-[20rem] w-[30rem]"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
        <Input
          placeholder="Diigte sua senha"
          className="max-md:w-[20rem] w-[30rem]"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}
        />

        <Button className="bg-[#F1CD65] hover:bg-[#FDC522] duration-300"
        onClick={handleLogin}
        >
          Cadastrar
        </Button>
      <p className="text-white text-center text-sm">Já possui uma conta? <Link href={'/login'}
   
      >Entre agora</Link></p>
      </div>
    </form>
  </div>
</div>
</div>)
}

export default Register;