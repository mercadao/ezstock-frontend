import LoginContainer from "@/app/components/organisms/LoginContainer/index";
import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login(){
    return(
        <>
            <div
                className="w-full h-screen flex justify-center items-center bg-white py-4"
            >
                <LoginContainer />
                <ToastContainer />
            </div>
        </>
    )
}