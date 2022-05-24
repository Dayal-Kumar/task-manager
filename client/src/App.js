import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Body from './components/Body';
import Footer from "./components/Footer";
import {axiosInstance} from "./config";
import {useEffect} from "react";


const App = () => {
    const [userObject, setUserObject] = React.useState();
    const userReloader = () => {
        axiosInstance.get('/get-user', { withCredentials: true}).then(res => {
            console.log(res.data);
            if(res.data) {
                setUserObject(res.data);
            }
        })
    }
    useEffect(() => {
        userReloader();
    }, []);

    return (
    <div>
        <Header username={userObject?.username}/>
            <Body user={userObject} userReloader={() => userReloader()}/>
        <Footer/>
    </div>
);
}

export default App;
