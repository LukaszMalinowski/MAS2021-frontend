import {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import MainPage from "./pages/MainPage/MainPage";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

class App extends Component {
    render() {
        return (
            <div>
                <Route exact path="/">
                    <Redirect to="/login"/>
                </Route>
                <Route exact path="/login" component={() => <LoginPage/>}/>
                <Route path="/main" component={MainPage}/>
                <Route exact path="/registration" component={RegistrationPage}/>
            </div>
        );
    }
}

export default App;
