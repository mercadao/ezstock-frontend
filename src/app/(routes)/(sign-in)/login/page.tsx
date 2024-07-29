import LoginContainer from "@/app/components/organisms/LoginContainer";
import React from "react";

export default function Login(){
    return(
        <>
            <div
                className="w-full h-screen flex justify-center items-center bg-white py-4"
            >
                <LoginContainer />
            </div>
        </>
    )
}