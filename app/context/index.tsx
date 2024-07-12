'use client'

import React, { createContext, ReactNode, useState } from 'react';

type AuthContextData = {
    user: UserProps | undefined;
    isAuthenticated: boolean;
    singIn: (credentials: SiginProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
}

type SiginProps = {
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const contextAuth = createContext({} as AuthContextData);

export default function ContextProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps | undefined>(undefined);
    const isAuthenticated = !!user;

    async function singIn({email,password}: SiginProps) {
        alert(email);
        alert(password)
    }

    return (
        <contextAuth.Provider value={{ singIn, user, isAuthenticated , }}>
            {children}
        </contextAuth.Provider>
    );
}
