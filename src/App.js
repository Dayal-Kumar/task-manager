import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from "./components/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useContext} from "react";
import {myContext} from "./Context";
import AddEditTask from "./components/AddEditTask";


const App = () => {
    const userObj = useContext(myContext);
    console.log(userObj);
    return (
    <BrowserRouter>
        <Header username={userObj?.username}/>
        <Routes>
            <Route path='/' element={<Body/>}>
                <Route path='add' element={<AddEditTask type="add"/>}/>
                <Route path='edit' element={<AddEditTask type="edit"/>}/>
            </Route>
        </Routes>
        <Footer/>
    </BrowserRouter>
);
}

export default App;
