import Navbar from '../components/Navbar';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

import CaesarCipherBoard from "../components/CaesarCipherBoard";
import DESBoard from "../components/DESBoard";
import AESBoard from "../components/AESBoard";

function User_Dashboard(props) {
    return (
        <div className="user-dashboard">
            <Navbar
                logout = {props.logout}
            />
            <div className="dashboard-content">
                <Routes>
                    <Route path="/" element={<Navigate replace to="/CaesarCipher"/>}/>
                    <Route path="/CaesarCipher/*" element={<CaesarCipherBoard />} />
                    <Route path="/DES/*" element={<DESBoard />} />
                    <Route path="/AES/*" element={<AESBoard />} />
                </Routes>

            </div>
        </div>
    );
}

export default User_Dashboard