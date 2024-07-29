import Button from "@/app/components/atoms/Button/DefaultButton"
import SmallButton from "@/app/components/atoms/Button/SmallButton";
import Input from "@/app/components/atoms/Input";
import FilterIcon from "../../../../../public/assets/icons/FilterIcon";
import SwapIcon from "../../../../../public/assets/icons/SwapIcon";

export default function PainelHeader(){
    return(
        <div
        className="w-full flex justify-between mt-8"
    >   
        <div className="">
            <Button
                text="+ Adicionar produto"
                onClick={() => console.log("+ Adicionar produto")}
                customColorText="text-offwhite"
                customColorBg="bg-primary-900"
            />
        </div>

        <div className="flex gap-4">
            <div className="w-[200px]">
                <Input 
                    onChange={() => console.log("Pesquisar")}
                    placeholder="Pesquisar produtos"
                    type="text"
                />
            </div>
            
            <div className="text-primary-900 hover:text-white">
                <SmallButton 
                    icon={<FilterIcon />}
                />
            </div>

            <div className="text-primary-900 hover:text-white">
                <SmallButton 
                    icon={<SwapIcon />}
                />
            </div>
       
        </div>
    </div>
    )
}