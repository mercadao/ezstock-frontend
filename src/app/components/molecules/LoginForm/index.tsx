"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation'; 
import Image from "next/image";
import Button from "@/app/components/atoms/Button/DefaultButton/index";
import Input from "@/app/components/atoms/Input";
import Logo from '../../../../../public/assets/images/logo.png';
import UserIcon from "../../../../../public/assets/icons/UserIcon";
import LockIcon from "../../../../../public/assets/icons/LockIcon";
import { login } from '@/app/services/PostUser';
import { toast } from 'react-toastify'; 
import Cookies from 'js-cookie';

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const handleLogin = async () => {
    setEmailError(false);
    setPasswordError(false);
  
    if (!email) {
      toast.error('Por favor, preencha o campo de email.');
      setEmailError(true);
      return;
    }
    if (!password) {
      toast.error('Por favor, preencha o campo de senha.');
      setPasswordError(true);
      return;
    }
  
    try {
      const response = await login(email, password); 
      if (response.sucesso) {
        toast.success('Login bem-sucedido');
        console.log('Login bem-sucedido', response);
  
        Cookies.set('userEmail', email, { expires: 7 });
  
        router.push('/home'); 
      } else {
        if (response.mensagem === 'Não existe uma conta para o Email informado.') {
          toast.error('Email não encontrado. Verifique o endereço e tente novamente.');
          setEmailError(true);
        } else if (response.mensagem === 'Senha Inválida') {
          toast.error('Senha incorreta. Verifique sua senha e tente novamente.');
          setPasswordError(true);
        } else {
          toast.error(response.mensagem || 'Erro ao tentar realizar o login.');
        }
      }
    } catch (error) {
      toast.error('Erro ao tentar realizar o login.');
      console.error('Erro ao tentar realizar o login:', error);
    }
  };
  

  return (
    <div className="flex flex-col justify-center items-center w-[300px] bg-offwhite rounded-lg py-8 md:py-[5%] gap-2 px-8 shadow-2xl md:w-[60%]">
      
      <Image alt="logo vila vitoria" sizes="200" src={Logo} />

      <h2 className="text-black font-bold text-xl my-4">Acesse sua conta</h2>

      <Input
        label="Email"
        placeholder="Digite seu email"
        icon={<UserIcon height="24px" width="24px" />}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        value={email}
        hasError={emailError} // Passa o estado de erro para o Input
      />

      <Input
        label="Senha"
        placeholder="Digite sua senha"
        icon={<LockIcon height="24px" width="24px" />}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        value={password}
        hasError={passwordError} // Passa o estado de erro para o Input
      />

      <Button
        text="Login"
        onClick={handleLogin}
        customColorText="text-offwhite"
        weight="font-bold"
      />
    </div>
  );
}
