import React, {useState} from "react";
import "./App.css";
import LoginRegisterUser from "./data-service/LoginRegisterUser";
import DashBoard from "./dashboard/RootComponent";
import {ToastContainer} from "react-toastify";
import {loginStatus, logout} from "./data-service/LoginDataService";
import "react-toastify/dist/ReactToastify.css";
import {validateUser} from "./data-service/UserDataService";
import {ToastError} from "./components/ToastError";

function App() {
    const [isLogged, setIsLogged] = useState(loginStatus());

    const logged = (status) => {
        if (status) {
            validateUser().then((user) => {
                console.log(user)
                if (user && !user.active) {
                    ToastError("This account was not enabled by administrator yet.");
                    setIsLogged(false);
                    logout()
                } else {
                    setIsLogged(loginStatus());
                }
            })
        } else {
            setIsLogged(loginStatus());
        }
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
