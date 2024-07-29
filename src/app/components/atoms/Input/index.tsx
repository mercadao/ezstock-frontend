import React, { ReactNode, useState } from 'react';

interface InputProps {
    label?: string;
    type: string;
    placeholder: string;
    customColorText?: string;
    weight?: string;
    onChange: () => void;
    icon?: ReactNode;
}

export default function Input({
    label,
    type,
    placeholder,
    icon,
    customColorText,
    weight,
    onChange
}: InputProps) {

    const colorText = customColorText ? customColorText : 'text-offgray';
    const fontWeight = weight ? weight : 'font-normal';

    return (
        <div className="mb-4 flex flex-col gap-2 w-full">
            <label className={`text-sm ${colorText} ${fontWeight}`}>
                {label}
            </label>
            <div className="relative group  w-full">
                {icon && (
                    <div className="absolute text-gray-500 inset-y-0 left-0 flex items-center pl-1 pointer-events-none group-focus-within:text-orange-400">
                        {React.cloneElement(icon as React.ReactElement, { className: "text-black group-focus-within:text-orange-400" })}
                    </div>
                )}
                <input
                    placeholder={placeholder}
                    type={type}
                    className={`
                        block w-full pl-10 pr-3 py-2 
                        border-b bg-transparent  text-black
                        focus:outline-none focus:ring-primary-400
                        focus:border-primary-400 focus:placeholder:text-primary-400
                    `}
                />
            </div>
        </div>
    );
}
