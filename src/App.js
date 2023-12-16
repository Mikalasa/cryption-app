import './App.scss'
import Background_animation from "./layout/Background_animation"
import SigninSignup from "./components/SigninSignup"
import User_Dashboard from "./pages/User_Dashboard"
import {useEffect, useState} from "react";
function App() {
    const isLoggedIn = () => {
        return localStorage.getItem("userToken") !== null;
    };

    const [loggedIn, setLoggedIn] = useState(isLoggedIn());

    const storeToken = (token) => {
        localStorage.setItem("userToken", token);
        setLoggedIn(true);
    };


    const logout = () => {
        console.log("logout");
        localStorage.removeItem("userToken");
        setLoggedIn(false);
    };

    useEffect(() => {
        setLoggedIn(isLoggedIn());
    }, []);

    return (
        <div className="App">
            <Background_animation/>
            {loggedIn
                ? <User_Dashboard
                    logout = {logout}
                />
                : <SigninSignup
                    storeToken = {storeToken}
                />
            }
        </div>
    );
}

export default App
