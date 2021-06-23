import {Component} from "react";
import {Button, Form, FormLabel} from "react-bootstrap";
import AuthService from "../../services/auth-service";
import CarsService from "../../services/cars-service";
import GarageService from "../../services/garage-service";
import RepairService from "../../services/repair-service"
import "./VisitRegisterer.css"
import {Checkbox, Typography} from "@material-ui/core";

class VisitRegisterer extends Component {

    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user,
            cars: [],
            garages: [],
            dates: [],
            carId: null,
            visitDate: null,
            garageId: null,
            invoiceNeeded: false,
            isDoorToDoor: false,
            description: null,
            registered: false,
            error: false
        }
    }

    handleSubmit = evt => {
        evt.preventDefault();

        const state = this.state;

        const registerRequest = {
            clientId: state.currentUser.id,
            carId: state.carId,
            garageId: state.garageId,
            visitDate: state.visitDate,
            isDoorToDoor: state.isDoorToDoor,
            invoiceNeeded: state.invoiceNeeded,
            description: state.description
        }

        this.registerVisit(registerRequest);
    }

    registerVisit = registerRequest => {
        RepairService.registerVisit(registerRequest)
            .then(() => this.setState({added: true}))
            .catch(() => this.setState({error: true}))
    }

    componentDidMount() {
        CarsService.fetchUserCars(this.state.currentUser.id)
            .then(response => this.setState(
                {
                    cars: response,
                    carId: response[0].id
                }));

        GarageService.fetchAllGarages()
            .then(response => this.setState({
                garages: response,
                garageId: response[0].id,
                dates: response[0].availableDates,
                visitDate: response[0].availableDates[0]
            }))

    }

    fetchDates = evt => {
        this.handleChange(evt);

        const garageId = evt.target.value;

        GarageService.fetchAllGarageDates(garageId)
            .then(response => this.setState({
                dates: response
            }));
    }

    handleChange = evt => {
        this.setState({[evt.target.id]: evt.target.value})
    }

    handleCheckboxChange = evt => {
        this.setState({[evt.target.id]: evt.target.checked})
    }

    render() {
        const {cars, garages, dates, added, error} = this.state;

        if(added) {
            return <Typography className="VisitRegisterer-Registered" variant="h3">Visit registered!</Typography>
        }

        return (
            <Form className="VisitRegisterer" onSubmit={this.handleSubmit}>
                <Form.Group>
                    <FormLabel>Car</FormLabel>
                    <Form.Control as="select" id="carId" onChange={this.handleChange}>
                        {cars.map(car => <option value={car.id} key={car.id}>{car.mark} {car.model}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <FormLabel>Service</FormLabel>
                    <Form.Control as="select" id="garageId" onChange={this.fetchDates}>
                        {garages.map(garage => <option value={garage.id}  key={garage.id}>{garage.name}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <FormLabel>Date of visit</FormLabel>
                    <Form.Control as="select" id="visitDate" onChange={this.handleChange}>
                        {dates.map(date => <option value={date} onChange={this.handleChange} key={date}>{new Date(date).toLocaleString()}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <FormLabel>Invoice</FormLabel>
                    <Checkbox id="invoiceNeeded" value="invoiceNeeded" color="primary" onChange={this.handleCheckboxChange}/>
                </Form.Group>
                <Form.Group className="VisitRegisterer-Checkbox">
                    <FormLabel>Door to door</FormLabel>
                    <Checkbox id="isDoorToDoor" value="isDoorToDoor" color="primary" onChange={this.handleCheckboxChange}/>
                </Form.Group>
                <Form.Group>
                    <FormLabel>Description</FormLabel>
                    <Form.Control id="description" as="textarea" onChange={this.handleChange}/>
                </Form.Group>
                <Button style={{marginTop: '20px'}} variant="primary" type="submit">Register visit</Button>
                {error && <Typography variant="h6" color="secondary">An error occurred. Try again</Typography>}
            </Form>
        );
    }
}

export default VisitRegisterer;