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

        if(!currentUser) {
            console.log("I AM HERE");
            return <Redirect to="/login"/>
        }

        return (
            <h3>Hello from main:)</h3>
        )
    }
}

export default MainPage;