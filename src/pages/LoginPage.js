import {Component} from "react";
import AuthService from "../services/auth-service"
import {Redirect} from "react-router-dom";


class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined,
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if(user) {
            this.setState({
                currentUser: user
            })
        }
    }

    render() {
        if(this.state.currentUser) {
            return <Redirect to="/main" />
        }

        // AuthService.login("lukasz.malinowski10@gmail.com", "qwerty123");

        return (
            <h3>Hello from login:)</h3>
        )
    }

}

export default LoginPage;