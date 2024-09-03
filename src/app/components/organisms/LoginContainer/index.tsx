import Image from "next/image";
import LoginForm from "@/app/components/molecules/LoginForm";
import PhoneImage from  '../../../../../public/assets/images/phoneImage.png'

export default function LoginContainer(){
    return(
        <>
            <div className="size-[90%] rounded-lg shadow-2xl flex  bg-offwhite
            flex-col md:size-[80%] md:flex-row">

                <div
                    className="w-2/4 h-full flex-col items-center justify-center gap-4
                    hidden md:flex"
                >   
                    <div className="flex flex-col gap-2 text-center justify-center items-center">
                        <p className="text-primary-400 text-2xl font-bold w-3/4">
                            Gerencie seu estoque 
                            com mais eficiência 
                            <br /><b className="text-secondary-900">em nosso site</b>
                        </p>
                       
                    </div>
                   
                    <Image 
                        alt="phone image"
                        src={PhoneImage}
                        className="w-[70%]"
                    />
                </div>

                <div className="w-full h-full flex items-center justify-center bg-primary-400 rounded-lg rounded-r-lg
                md:w-2/4 md:rounded-l-none 
                ">
                    <LoginForm />
                </div>

            </div>
        </>
    )
}