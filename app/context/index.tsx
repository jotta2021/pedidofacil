"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";
import axios from "axios";
import { api } from "../services/apiClient";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

type AuthContextData = {
  user: UserProps | undefined;
  isAuthenticated: boolean;
  singIn: (credentials: SiginProps) => Promise<void>;
  singOut: () => void;
  Register: (credentials:RegisterProps) => Promise<void>;
};

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SiginProps = {
  email: string;
  password: string;
};
type RegisterProps = {
    name:string;
    email:string;
    password:string;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const contextAuth = createContext({} as AuthContextData);

export function singOut() {
  try {
    destroyCookie(undefined, "auth.token");
    
  } catch (error) {
    console.log("Erro ao deslogar usuário");
  }
}

export default function ContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | undefined>(undefined);
  const isAuthenticated = !!user;
  const router = useRouter()
const {toast} = useToast()

// ao abrir o site ele verificar se tem o token armazenado
// se tiver ele busca os dados do usuario na api atraves do token, para poder armazenar
useEffect(()=> {
const {'@auth.token' :token} = parseCookies();

if(token){
   api.get('/detail').then((response)=> {
    const {email,id,name} = response.data;
    setUser({
        name,
        id, 
        email
    })
   }).catch((error)=> {
    singOut();
   })
}
},[])


  async function singIn({ email, password }: SiginProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });
      const { name, token, id } = response.data;
      setUser({
        id: id,
        name: name,
        email: email,
      });
      setCookie(undefined, "@auth.token", token, {
        maxAge: 60 * 60 * 24 * 30, //expira em um mes,
        path: "/", //quais caminhos tem acesso ao cookie
      });

      // passar o mesmo token em todas as requisições
      api.defaults.headers["Authorization"] = `Bearer ${token}`;


  router.push('/dashboard')




    } catch (error) {
      console.log("Erro ao acessar", error);
      toast({
        title:'Erro ao acessar sua conta',
        description:'verifique suas credenciais',
        variant:'destructive'
      })
    }
  }


  async function Register({name,email,password}:RegisterProps){
try{
const response = await api.post('/user',{
    name,
    email,
    password
})
toast({
    title:'Uhu! Cadastro realzado',
    description:'você já pode entrar na sua conta',
    variant:'default'
})
router.push('/login')


}
catch(error){
toast({
    title:'Erro ao criar conta,tente novamente!',
    variant:'destructive',
   
})
}
  }
  return (
    <contextAuth.Provider value={{ singIn, user, isAuthenticated, singOut,Register }}>
      {children}
    </contextAuth.Provider>
  );
}
