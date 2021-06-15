import {Component} from "react";
import AuthService from "./services/auth-service"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showUserBoard: false,
            showOwnerBoard: false,
            currentUser: undefined
        }
    }

    componentDidMount() {
        // AuthService.login('lukasz.malinowski10@gmail.com', 'qwerty123');
        const user = AuthService.getCurrentUser();
        console.log(user);
        if (user) {
            this.setState({
                currentUser: user,
                showUserBoard: user.role === "ROLE_USER",
                showOwnerBoard: user.role === "ROLE_OWNER"
            })
        }
    }

    logout = () => {
        AuthService.logout();
    }

    render() {
        const {currentUser, showUserBoard, showOwnerBoard} = this.state;

        return (
            <div>
                <h3>hello :)</h3>
            </div>
        );
    }
}

export default App;
