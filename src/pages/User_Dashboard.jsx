import Navbar from '../components/Navbar';
function User_Dashboard(props) {
    return (
        <div className="user-dashboard">
            <Navbar
                logout = {props.logout}
            />
        </div>
    );
}

export default User_Dashboard