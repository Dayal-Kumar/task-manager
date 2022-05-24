import React from 'react';
import {GoogleLoginButton} from "react-social-login-buttons";
import axios from "axios";


const Login = () => {

    const GoogleLogin = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/auth/google`, '_self');
    }

    return <>
        <GoogleLoginButton style={{width: '30%', margin: 'auto', marginTop: '50px'}} onClick={GoogleLogin}/>
    </>
}

export default Login;