import {Component} from "react";
import AuthService from "../../services/auth-service"
import {NavLink, Redirect} from "react-router-dom";
import {Button, TextField} from "@material-ui/core";
import './LoginPage.css';

class LoginPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUser: undefined,
            error: false
        }
    }

    componentDidMount() {
        this.setUser();
    }

    setUser = () => {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user
            })
        }
    }

    handleChange = evt => {
        this.setState({[evt.target.id]: evt.target.value})
    }

    handleCheckIfEnter = evt => {
        if (evt.key === "Enter") {
            this.handleLogin();
        }
    }

    handleLogin = async () => {
        const {email, password} = this.state;

        await AuthService.login(email, password)
            .catch(err => {
                if (err.response.status === 400 || err.response.status === 401) {
                    this.setState(state => state.error = true);
                }
            });

        this.setUser();
    }

    render() {
        const {currentUser, error} = this.state;

        if (currentUser) {
            return <Redirect to="/main"/>
        }

        return (
            <div className="LoginPage">
                <form>
                    <div className="row">
                        <TextField
                            className="col"
                            id="email"
                            label="Email"
                            error={error}
                            onChange={this.handleChange}
                            onKeyPress={this.handleCheckIfEnter}
                        />
                    </div>

                    <div className="row">
                        <TextField
                            className="col"
                            id="password"
                            label="Password"
                            error={error}
                            type="password"
                            onChange={this.handleChange}
                            onKeyPress={this.handleCheckIfEnter}
                        />
                    </div>
                    {error && <div className="LoginPage-error">Username or password incorrect</div>}
                    <div className="row">
                        <Button
                            variant="contained"
                            className="col"
                            color="primary"
                            onClick={this.handleLogin}>
                            Login
                        </Button>
                        <NavLink to="/registration" className="LoginPage-registration-button">
                            <Button>
                                Register
                            </Button>
                        </NavLink>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginPage;