import * as React from 'react';
import { Button } from "../../../components/button/btn";
import { TextField } from '../../../components/textfield/textfield';
import { useLogin } from '../../../hooks/use-auth-state';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [status, setStatus] = React.useState("")

    const login = useLogin();
    const navigate = useNavigate();

    const renderRedirect = () => {
        navigate('/')
      }

    
    return(
        <>
        <h1>User Login</h1>
        <form onSubmit={(ev) =>{
            ev.preventDefault(); 
            login(email, password)
                .then(() => renderRedirect())
                .catch(() => setStatus("Error"))
        }}>
            <TextField name="user" type="text" labeltext="Username" value={email} onChange={(ev) => setEmail(ev.target.value)}>
                </TextField>
            <TextField name="pw" type="password" labeltext="Password" value={password} onChange={(ev) => 
                setPassword(ev.target.value)}>
                </TextField>
            <Button innerText="Submit" mode="colorful" type="submit"/>
            {
                status === 'Error' ? <p className='errormsg'>An error has occurred</p> : null
            }
        </form>
        </>
    )
}