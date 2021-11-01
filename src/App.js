import React, {useState} from "react";
import "./App.css";
import LoginRegisterUser from "./data-service/LoginRegisterUser";
import DashBoard from "./dashboard/RootComponent";
import {ToastContainer} from "react-toastify";
import {loginStatus} from "./data-service/LoginDataService";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const [isLogged, setIsLogged] = useState(loginStatus());

    const logged = () => {
        setIsLogged(loginStatus());
    };

    return (
        <div>
            <ToastContainer/>
            {isLogged ? (
                <div>
                    <DashBoard logged={logged}/>
                </div>
            ) : (
                <LoginRegisterUser logged={logged}/>
            )}
        </div>
    );
}

export default App;
