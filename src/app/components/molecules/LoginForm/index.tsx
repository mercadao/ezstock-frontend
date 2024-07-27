import UserIcon from "../../../../../public/assets/icons/UserIcon";
import LockIcon from "../../../../../public/assets/icons/LockIcon";

import Button from "@/app/components/atoms/Button/index";
import Input from "@/app/components/atoms/Input";

export default function LoginForm(){
    return(
        <>  
             <div className="w-screen h-screen flex justify-center items-center">

                <div className="flex flex-col justify-center items-center
                bg-offwhite rounded-md py-8">

                    <div className="flex flex-col gap-5 mx-8">
                        <Input
                            label="Email"
                            placeholder="Digite seu email"
                            icon={<UserIcon height="24px" width="24px" />}
                            onChange={() => console.log('Email')}
                            type="text"
                        />
                        
                        <Input
                            label="Senha"
                            placeholder="Digite sua senha"
                            icon={<LockIcon height="24px" width="24px" />}
                            onChange={() => console.log('senha')}
                            type="password"
                        />
                    </div>

                    <Button
                        text="Login"
                        onClick={() => console.log('Login')}
                        customColorText="text-offwhite"
                        weight="font-bold"
                    />


                </div>
                
             
            </div>

        </>
    )
}