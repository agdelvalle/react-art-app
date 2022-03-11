import * as React from 'react';
import './register-form.css'
import { Button } from "../../../components/button/btn";
import { TextField } from '../../../components/textfield/textfield';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../../components/loader/loader';

async function RegisterFunc(name, email, password) {
    console.log(name, email, password)
    return fetch('https://ecomm-new-jan22.herokuapp.com/register', {
        method: 'POST',
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password,
            avatar: 'http://github.com/malcolm-kee.png'
        })
    }).then(res => {
        if(res.ok){
            return res.json()
        }
        throw new Error(res.statusText)
    })
}

export const RegisterForm = () => {

    const [isLoading, setIsLoading] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [name, setName] = React.useState("")

    const navigate = useNavigate();

    const renderRedirect = () => {
        navigate('/login')
      }
    
    return(
        <>
            <h1>Register New User</h1>
            
            <form onSubmit={(ev) =>{
                ev.preventDefault(); 
                setIsLoading(true)
                RegisterFunc(name, email, password).then((res) => {
                    console.log(res);
                }).then(() => {
                    setIsLoading(false)
                    renderRedirect();
                })
            }}>
                <TextField name="name" type="text" labeltext="Username" value={name} 
                    onChange={(ev) => setName(ev.target.value)}/>
                <TextField name="email" type="text" labeltext="Email" value={email} 
                    onChange={(ev) => setEmail(ev.target.value)}/>
                <TextField name="pw" type="password" labeltext="Password" value={password} 
                    onChange={(ev) => 
                    setPassword(ev.target.value)} />
                <Button innerText="Register" mode="colorful" type="submit" />
                <br />
                {isLoading? <><Loader /><h3>Processing registration, please wait...</h3></>:null}
            </form>
        </>
    )
} 