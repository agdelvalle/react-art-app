import * as React from 'react';
import { Header } from "../../domains/header/header";
import { RegisterForm } from "../../domains/auth/register-form/register-form";

export const RegisterPage = () => {
    
    return(
        <>
        <Header />
        <div className='form-container'>
            <RegisterForm />
        </div>
        </>
    )
} 