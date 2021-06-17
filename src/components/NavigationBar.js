import {Component} from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const buttonMarin = {
    marginLeft: '20px'
};

const logoutStyle = {
    marginLeft: 'auto',
    marginRight: '20px'
};

class NavigationBar extends Component {


    render() {
        const {user, logout} = this.props;


        return (
            <AppBar position="fixed">
                <Toolbar>
                    <Typography
                        variant="h6">
                        {user.name}
                    </Typography>
                    {user.role === "ROLE_USER" ?
                        (<div>
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
                        </div>) :
                        (
                            <div>
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
                            </div>
                        )
                    }
                    <Button
                        color="inherit"
                        variant="text"
                        style={logoutStyle}
                        onClick={logout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }

}

export default NavigationBar;