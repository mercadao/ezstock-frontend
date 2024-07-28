import React, { useState } from "react";
import Image from "next/image";

//components
import Button from "@/app/components/atoms/Button/index";
import Input from "@/app/components/atoms/Input";

//assets
import Logo from '../../../../../public/assets/images/logo.png'
import UserIcon from "../../../../../public/assets/icons/UserIcon";
import LockIcon from "../../../../../public/assets/icons/LockIcon";


export default function LoginForm() {
  return (
      <div className="flex flex-col justify-center items-center w-[300px]
    bg-offwhite rounded-lg py-8 gap-2 px-8 shadow-2xl md:w-[400px]">
        
        <Image
            alt="logo vila vitoria"
            sizes={'200'}
            src={Logo}
        />

        <h2
            className="text-black font-bold text-xl my-4"
        >
            Acesse sua conta
        </h2>

        <Input
          label="Email"
          placeholder="Digite seu email"
          icon={<UserIcon height="24px" width="24px" />}
          onChange={() => console.log("Email")}
          type="text"
        />

        <Input
          label="Senha"
          placeholder="Digite sua senha"
          icon={<LockIcon height="24px" width="24px" />}
          onChange={() => console.log("senha")}
          type="password"
        />

        <Button
          text="Login"
          onClick={() => console.log("Login")}
          customColorText="text-offwhite"
          weight="font-bold"
        />
      </div>
  );
}
