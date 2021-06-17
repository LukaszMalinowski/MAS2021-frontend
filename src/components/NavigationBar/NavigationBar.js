import {Component} from "react";
import {AppBar, Toolbar, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import "./NavigationBar.css"

const buttonMarin = {
    marginLeft: '20px'
};

const logoutStyle = {
    marginLeft: 'auto',
    marginRight: '20px'
};

const appBarStyle = {
    marginBottom: '25px'
};

class NavigationBar extends Component {


    render() {
        const {user, logout} = this.props;

        return (
            <AppBar position="sticky"
                    style={appBarStyle}>
                <Toolbar className="NavigationBar">
                    <Typography
                        variant="h6">
                        {user.name}
                    </Typography>
                    {user.role === "ROLE_USER" ?
                        (<div>
                            <Button
                                color="inherit"
                                variant="outlined"
                                style={buttonMarin}
                                component={Link}
                                to="/main/myCars"
                            >
                                Your cars
                            </Button>
                            <Button
                                color="inherit"
                                variant="outlined"
                                style={buttonMarin}
                                component={Link}
                                to="/main/addCar">
                                Add car
                            </Button>
                            <Button
                                color="inherit"
                                variant="outlined"
                                style={buttonMarin}
                                component={Link}
                                to="/main/registerVisit">
                                Register visit
                            </Button>
                            <Button
                                color="inherit"
                                variant="outlined"
                                style={buttonMarin}
                                component={Link}
                                to="/main/repairHistory">
                                Repair history
                            </Button>
                            <Button
                                color="inherit"
                                variant="outlined"
                                style={buttonMarin}
                                component={Link}
                                to="/main/availableGarages">
                                Available garages
                            </Button>
                        </div>)
                        :
                        (<div>
                            <Button
                                color="inherit"
                                variant="outlined"
                                style={buttonMarin}
                                component={Link}
                                to="/main/allRepairs"
                            >
                                All repairs
                            </Button>
                            <Button
                                color="inherit"
                                variant="outlined"
                                style={buttonMarin}
                                component={Link}
                                to="/main/manageGarage">
                                Manage garage
                            </Button>
                        </div>)
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