import React from 'react';
import {Navbar, Container } from "react-bootstrap";
import {axiosInstance} from "../config";


const Header = (props) => {
    const logout = () => {
        axiosInstance.get('/auth/logout', {withCredentials: true}).then(res => {
            if(res.data === 'success') {
                // setUserObj();
                window.location.href = '/';
            }
        }).catch(err => console.log(err));
    }

    return <>
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>Task Manager</Navbar.Brand>
                <Navbar.Text>{props.username}</Navbar.Text>
                <Navbar.Brand onClick={logout}>{props.username ? "Logout" : undefined}</Navbar.Brand>
            </Container>
        </Navbar>
    </>
}

export default Header;