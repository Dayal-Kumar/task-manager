import React from 'react';
import {GoogleLoginButton} from "react-social-login-buttons";
import {axiosInstance} from "../config";


const Login = () => {

    const GoogleLogin = () => {
        window.open('/api/auth/google', '_self');
    }

    return <>
        <GoogleLoginButton style={{width: '30%', margin: 'auto', marginTop: '50px'}} onClick={GoogleLogin}/>
    </>
}

export default Login;