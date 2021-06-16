import {Component} from "react";
import AuthService from "../services/auth-service"
import {Redirect} from "react-router-dom";

class MainPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined
        }
    }


    componentDidMount() {
        const user = AuthService.getCurrentUser();
        this.setState(state => state.currentUser = user);
    }

    render() {
        const {user} = this.state;

        if(!user) {
            return <Redirect to="/login"/>
        }

        return (
            <h3>Hello from main:)</h3>
        )
    }
}

export default MainPage;