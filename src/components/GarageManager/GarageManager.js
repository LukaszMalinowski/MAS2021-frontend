import {Component} from "react";
import GarageService from "../../services/garage-service"
import AuthService from "../../services/auth-service";
import {TextField, Typography} from "@material-ui/core";
import "./GarageManager.css"
import {Form, Row} from "react-bootstrap";
import Button from "@material-ui/core/Button";

class GarageManager extends Component {

    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user,
            dates: [],
            newDatetime: new Date(),
        }
    }

    handleChange = evt => {
        this.setState({[evt.target.id]: new Date(evt.target.value)})
    }

    handleSubmit = evt => {
        evt.preventDefault();

        const date = this.state.newDatetime.toISOString();

        GarageService.addGarage(this.state.currentUser.garageId, date)
            .then(() => this.setState({dates: [...this.state.dates, date]}))
    }

    componentDidMount() {
        GarageService.fetchAllGarageDates(this.state.currentUser.garageId)
            .then(response => this.setState({dates: response}))
    }

    render() {
        const dates = this.state.dates;

        const initialDate = this.state.newDatetime.toISOString();

        return (
            <div className="GarageManager">
                <ul style={{marginRight: "30px"}}>
                    {dates.map(date => <li key={date}>
                        <Typography variant="h6">{new Date(date).toLocaleString()}</Typography>
                    </li>)}
                </ul>
                <Form>
                    <TextField
                        id="newDatetime"
                        label="New date"
                        type="datetime-local"
                        onChange={this.handleChange}
                        defaultValue={initialDate
                            .slice(0, initialDate.indexOf('.'))}
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                    <Row>
                        <Button type="submit" onClick={this.handleSubmit}>Add date</Button>
                    </Row>
                </Form>
            </div>
        );
    }

}

export default GarageManager;