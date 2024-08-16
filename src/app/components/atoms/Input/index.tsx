import React, { ReactNode, ChangeEvent } from 'react';

interface InputProps {
    label?: string;
    type: string;
    placeholder: string;
    customColorText?: string;
    weight?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    icon?: ReactNode;
    hasError?: boolean; 
}

export default function Input({
    label,
    type,
    placeholder,
    icon,
    customColorText,
    weight,
    value,
    onChange,
    hasError = false
}: InputProps) {

    const colorText = customColorText ? customColorText : (hasError ? 'text-red-500' : 'text-offgray');
    const fontWeight = weight ? weight : 'font-normal';
    const borderColor = hasError ? 'border-red-500' : 'border-gray-300'; 

    return (
        <div className="mb-4 flex flex-col gap-2 w-full">
            {label && (
                <label className={`text-sm ${colorText} ${fontWeight}`}>
                    {label}
                </label>
            )}
            <div className="relative group w-full">
                {icon && (
                    <div className={`absolute inset-y-0 left-0 flex items-center pl-1 pointer-events-none ${hasError ? 'text-red-500' : 'text-gray-500'} group-focus-within:text-orange-400`}>
                        {React.cloneElement(icon as React.ReactElement, { className: `text-black ${hasError ? 'text-red-500' : 'text-black'} group-focus-within:text-orange-400` })}
                    </div>
                )}
                <input
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className={`
                        block w-full pl-10 pr-3 py-2 
                        border-b ${borderColor} bg-transparent text-black
                        focus:outline-none focus:ring-primary-400
                        focus:border-primary-400 focus:placeholder:text-primary-400
                        ${colorText}
                    `}
                />
            </div>
        </div>
    );
}
