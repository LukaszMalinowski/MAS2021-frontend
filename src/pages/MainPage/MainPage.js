import {Component} from "react";
import AuthService from "../../services/auth-service"
import {Redirect} from "react-router-dom";
import "./MainPage.css"
import NavigationBar from "../../components/NavigationBar";

class MainPage extends Component {

    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user
        }
    }

    handleLogout = () => {
        AuthService.logout();

        this.setState({currentUser: null});
    }


    render() {
        const {currentUser} = this.state;

        if (!currentUser) {
            return <Redirect to="/login"/>
        }
        return (
            <div>
                <NavigationBar user={currentUser} logout={this.handleLogout}/>
            </div>
        )
    }
}

export default MainPage;