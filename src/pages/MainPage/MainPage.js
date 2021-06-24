import {Component} from "react";
import AuthService from "../../services/auth-service"
import {Redirect, Route} from "react-router-dom";
import "./MainPage.css"
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import CarList from "../../components/CarList/CarList";
import CarAdder from "../../components/CarAdder/CarAdder";
import VisitRegisterer from "../../components/VisitRegisterer/VisitRegiterer";
import VisitManager from "../../components/VisitManager/VisitManager";
import GarageList from "../../components/GarageList/GarageList";
import RepairHistoryList from "../../components/RepairHistoryList/RepairHistoryList";

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
        return (
            <div>
                <NavigationBar user={currentUser} logout={this.handleLogout}/>
                <Route path="/main/myCars" component={CarList}/>
                <Route path="/main/addCar" component={CarAdder}/>
                <Route path="/main/registerVisit" component={VisitRegisterer}/>
                <Route path="/main/allRepairs" component={VisitManager}/>
                <Route path="/main/availableGarages" component={GarageList}/>
                <Route path="/main/repairHistory" component={RepairHistoryList}/>
            </div>
        )
    }
}

export default MainPage;