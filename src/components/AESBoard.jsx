import {Navigate, Route, Routes} from "react-router-dom";
import AESContentEncryption from "./boardComponents/AESContentEncryption";
import AESContentDecryption from "./boardComponents/AESContentDecryption";
import AESContentHistory from "./boardComponents/AESContentHistory";
import AESNavbar from "./AESNavBar";

function AESBoard() {
    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    const fullName = `${firstName} ${lastName}`;
    return (
        <div className="dashboard-content-panel">
            <div className="dashboard-content-panel-side">
                <div className="dashboard-content-panel-title max-w-screen-xl">
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <div className="text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Welcome
                                Back, <br></br>{fullName}!</h1>
                            <p className="mt-1.5 text-sm text-gray-500">Let's write a new AES! 🎉</p>
                        </div>
                    </div>
                </div>
                <AESNavbar/>
            </div>
            <div className="dashboard-content-panel-content">
                <Routes>
                    <Route path="/" element={<Navigate replace to="Encryption"/>}/>
                    <Route path="/Encryption" element={<AESContentEncryption/>}/>
                    <Route path="/Decryption" element={<AESContentDecryption/>}/>
                    <Route path="/History" element={<AESContentHistory/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default AESBoard