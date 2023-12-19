import { NavLink } from 'react-router-dom';

function CaesarNavbar() {
    return (
        <ul className="dashboard-content-panel-nav bg-white px-4 py-4 space-y-1">
            <li>
                <NavLink
                    to="/CaesarCipher/Encryption"
                    className={({isActive}) =>
                        isActive
                            ? "block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                            : "block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }
                >
                    Encryption
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/CaesarCipher/Decryption"
                    className={({isActive}) =>
                        isActive
                            ? "block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                            : "block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }
                >
                    Decryption
                </NavLink>
            </li>

            <li>
                <NavLink
                    to="/CaesarCipher/History"
                    className={({isActive}) =>
                        isActive
                            ? "block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
                            : "block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }
                >
                    History
                </NavLink>
            </li>
        </ul>
    );
}

export default CaesarNavbar;
