import React, {useContext} from 'react';
import {Navbar, Container } from "react-bootstrap";
import axios from "axios";
import {myContext} from "../Context";


const Header = () => {
    const userObj = useContext(myContext);
    const logout = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/auth/logout`, {withCredentials: true}).then(res => {
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
                <Navbar.Text>{userObj?.username}</Navbar.Text>
                <Navbar.Brand onClick={logout}>{userObj?.username ? "Logout" : undefined}</Navbar.Brand>
            </Container>
        </Navbar>
    </>
}

export default Header;