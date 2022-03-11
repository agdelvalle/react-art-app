import * as React from 'react';
import { Header } from "../../domains/header/header";
import { LoginForm } from '../../domains/auth/login-form/login';
import { UseAuthState } from '../../hooks/use-auth-state';
import './login-page.css'

export const LoginPage = () => {

    const auth = UseAuthState();
    console.log(auth.authStatus, auth.login)

    return(
        <>
        <Header />
        <div className='form-container'> 
            <LoginForm />
        </div>
        </>
    )
}