import {Component} from "react";
import AuthService from "../services/auth-service"
import {Redirect} from "react-router-dom";

class MainPage extends Component {

    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user
        }
    }


    render() {
        const {currentUser} = this.state;

        if (!currentUser) {
            return <Redirect to="/login"/>
        }

        return (
            <div>
                <h1>Main page</h1>
                <p>You are logged in</p>
            </div>
        )
    }
}

export default MainPage;