import CaesarNavbar from "../components/CaesarNavbar";
import {Navigate, Route, Routes} from "react-router-dom";
import CaesarContentEncryption from "./boardComponents/CaesarContentEncryption";
import CaesarContentDecryption from "./boardComponents/CaesarContentDecryption";
import CaesarContentHistory from "./boardComponents/CaesarContentHistory";
function CaesarCipherBoard() {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const fullName = `${firstName} ${lastName}`;
    return(
        <div className="dashboard-content-panel">
            <div className="dashboard-content-panel-side">
                <div className="dashboard-content-panel-title max-w-screen-xl">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome
                                Back, <br></br>{fullName}!</h1>
                            <p className="mt-1.5 text-sm text-gray-500">Let's write a new Caesar Cipher! 🎉</p>
                        </div>
                    </div>
                </div>
                <CaesarNavbar/>
            </div>
            <div className="dashboard-content-panel-content">
                <Routes>
                    <Route path="/" element={<Navigate replace to="Encryption" />} />
                    <Route path="/Encryption" element={<CaesarContentEncryption/>}/>
                    <Route path="/Decryption" element={<CaesarContentDecryption/>}/>
                    <Route path="/History" element={<CaesarContentHistory/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default CaesarCipherBoard