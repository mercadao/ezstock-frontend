"use client"

import { Check } from "lucide-react";

interface CheckBoxProps {
    isActive: boolean;
  }
  
export function CheckBox({ isActive }: CheckBoxProps) {
    const checkBoxBg = isActive ? "bg-white" : "";
    const checkBoxBorder = isActive ? "" : "border-gray-400";
  
    return (
      <>
        <div 
            className={`h-6 w-6 border ${checkBoxBorder} ${checkBoxBg} rounded-md flex items-center justify-center cursor-pointer`} 
            onClick={() => {}}
        >
            {isActive ? (
                <Check size={24} color="#FF6A00"/>

            ) : (
                <></>
            )}
        </div>
      </>
    );
}