import {Navigate, Route, Routes} from "react-router-dom";
import DESContentEncryption from "./boardComponents/DESContentEncryption";
import DESContentDecryption from "./boardComponents/DESContentDecryption";
import DESContentHistory from "./boardComponents/DESContentHistory";
import DESNavbar from "./DESNavBar";

function DESBoard() {
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
                            <p className="mt-1.5 text-sm text-gray-500">Let's write a new DES! 🎉</p>
                        </div>
                    </div>
                </div>
                <DESNavbar/>
            </div>
            <div className="dashboard-content-panel-content">
                <Routes>
                    <Route path="/" element={<Navigate replace to="Encryption"/>}/>
                    <Route path="/Encryption" element={<DESContentEncryption/>}/>
                    <Route path="/Decryption" element={<DESContentDecryption/>}/>
                    <Route path="/History" element={<DESContentHistory/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default DESBoard