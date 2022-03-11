import React from "react";
import './header.css'
import brush from './brush.png'
import { UseAuth, useLogout } from '../../hooks/use-auth-state';
import { useNavigate, Link } from 'react-router-dom';

export const Header = (props) => {
    const { authStatus } = UseAuth();
    const navigate = useNavigate();

    const renderRedirect = () => {
        navigate('/')
    }

    const logoutFunc = useLogout();

    return (
        <header className="navbar navbar-default navbar-fixed-top">
            <Link to="/"><div className="header-left-icon navbar-left"><img src={brush}/><h2>Artists' Palette</h2></div></Link>
            <div className="header-right-menu navbar-right">
                <ul>
                    {authStatus === 'anonymous' ? 
                    <>
                    <Link to="/login"><li>Login</li></Link>
                    <Link to="/register"><li>Register</li></Link>
                    </>
                    :
                    <>      
                    <Link to="/favorites"><li>Favorites</li></Link>
                    <button className="btn btn-default navbar-btn" onClick={() => {
                        logoutFunc();
                        renderRedirect();
                    }}>Logout</button>
                    </>         
                    }
                </ul>
            </div>
        </header>)
}