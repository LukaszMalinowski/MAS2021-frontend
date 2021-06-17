import {Component} from "react";
import AuthService from "../../services/auth-service"
import {Redirect} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import "./MainPage.css"

const buttonMarin = {
    marginLeft: '20px'
};

const logoutStyle = {
    marginLeft: 'auto',
    marginRight: '20px'
};

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

        let navbar;

        if (currentUser.role === "ROLE_USER") {
            navbar = (
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography
                            variant="h6">
                            {currentUser.name}
                        </Typography>
                        <Button
                            color="inherit"
                            variant="outlined"
                            style={buttonMarin}>
                            Your cars
                        </Button>
                        <Button
                            color="inherit"
                            variant="outlined"
                            style={buttonMarin}>
                            Add car
                        </Button>
                        <Button
                            color="inherit"
                            variant="outlined"
                            style={buttonMarin}>
                            Register visit
                        </Button>
                        <Button
                            color="inherit"
                            variant="outlined"
                            style={buttonMarin}>
                            Repair history
                        </Button>
                        <Button
                            color="inherit"
                            variant="outlined"
                            style={buttonMarin}>
                            Available garages
                        </Button>
                        <Button
                            color="inherit"
                            variant="outlined"
                            style={buttonMarin}>
                            Available garages
                        </Button>
                        <Button
                            color="inherit"
                            variant="text"
                            style={logoutStyle}
                            onClick={this.handleLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            )
        } else {
            navbar = (
                <AppBar position="fixed">
                    <Toolbar>
                        <Typography
                            variant="h6">
                            {currentUser.name}
                        </Typography>
                        <Button
                            color="inherit"
                            variant="outlined"
                            style={buttonMarin}>
                            All repairs
                        </Button>
                        <Button
                            color="inherit"
                            variant="outlined"
                            style={buttonMarin}>
                            Manage garage
                        </Button>
                        <Button
                            color="inherit"
                            variant="text"
                            style={logoutStyle}
                            onClick={this.handleLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            )
        }


        return (
            <div>
                {navbar}
            </div>
        )
    }
}

export default MainPage;