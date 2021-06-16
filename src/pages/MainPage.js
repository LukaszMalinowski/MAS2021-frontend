import {Component} from "react";
import AuthService from "../services/auth-service"
import {Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";

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

        console.log(currentUser)

        if (!currentUser) {
            return <Redirect to="/login"/>
        }

        return (
            <div>
                <h1>Main page</h1>
                <p>You are logged in</p>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleLogout}>Logout</Button>
            </div>
        )
    }
}

export default MainPage;