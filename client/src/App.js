import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from "./components/Footer";
import {useContext} from "react";
import {myContext} from "./Context";


const App = () => {
    const userObj = useContext(myContext);
    console.log(userObj);
    return (
    <div>
        <Header username={userObj?.username}/>
            <Body/>
        <Footer/>
    </div>
);
}

export default App;
