import React, {createContext, useEffect, useState} from 'react';
import {axiosInstance} from "./config";

export const myContext = createContext({});
export default function Context(props) {
    const [userObj, setUserObj] = useState();
    useEffect(() => {
            axiosInstance.get('/get-user', { withCredentials: true}).then(res => {
                console.log(res.data);
                if(res.data) {
                    setUserObj(res.data);
                }
            })
    }, [props]);
    
    return <div>
        <myContext.Provider value={userObj}>
            {props.children}
        </myContext.Provider>
    </div>
}