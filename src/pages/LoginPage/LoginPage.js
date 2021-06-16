import {Component} from "react";
import AuthService from "../../services/auth-service"
import {Redirect} from "react-router-dom";
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

        console.log("here " + user)

        if (user) {
            this.setState({
                currentUser: user
            })
        }
    }

    handleChange = evt => {
        this.setState({[evt.target.id]: evt.target.value})
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
                        />
                    </div>
                    {error && <div className="LoginPage-error">Username or password incorrect</div>}
                    <div className="row">
                        <Button
                            variant="contained"
                            className="LoginPage-submit col"
                            color="primary"
                            onClick={this.handleLogin}>
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default LoginPage;