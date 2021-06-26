import {Component} from "react";
import CarsService from "../../services/cars-service";
import AuthService from "../../services/auth-service";
import {Button, Form, FormLabel} from "react-bootstrap";
import "./CarAdder.css"
import {Typography} from "@material-ui/core";


class CarAdder extends Component {

    constructor(props) {
        super(props);

        const user = AuthService.getCurrentUser();

        this.state = {
            currentUser: user,
            car: undefined
        }
    }

    handleSubmit = evt => {
        evt.preventDefault();

        const state = this.state;

        const car = {
            registrationNumber: state.registration,
            vinNumber: state.vin,
            productionYear: parseInt(state.productionYear),
            brand: state.brand,
            model: state.model,
            netEnginePower: parseFloat(state.power)
        };

        this.addCar(car);
    }

    handleChange = evt => {
        this.setState({[evt.target.id]: evt.target.value})
    }

    addCar = car => {
        CarsService.addCar(this.state.currentUser.id,
            car)
            .then(() => this.setState({added: true}))
            .catch(() => this.setState({error: true}));
    }

    render() {
        if (this.state.added) {
            return <Typography className="CarAdder-Added" variant="h3">Car added</Typography>
        }

        return (
            <Form className="CarAdder" onSubmit={this.handleSubmit}>
                <Form.Group>
                    <FormLabel>Model</FormLabel>
                    <Form.Control id="model" onChange={this.handleChange} placeholder="Enter model"/>
                </Form.Group>
                <Form.Group>
                    <FormLabel>Brand</FormLabel>
                    <Form.Control id="brand" onChange={this.handleChange} placeholder="Enter brand"/>
                </Form.Group>
                <Form.Group>
                    <FormLabel>Production year</FormLabel>
                    <Form.Control id="productionYear" onChange={this.handleChange} placeholder="Enter production year"/>
                </Form.Group>
                <Form.Group>
                    <FormLabel>Vin</FormLabel>
                    <Form.Control id="vin" onChange={this.handleChange} placeholder="Enter vin number"/>
                </Form.Group>
                <Form.Group>
                    <FormLabel>Registration number</FormLabel>
                    <Form.Control id="registration"
                                  onChange={this.handleChange}
                                  placeholder="Enter registration number"/>
                </Form.Group>
                <Form.Group>
                    <FormLabel>Engine power</FormLabel>
                    <Form.Control id="power" onChange={this.handleChange} placeholder="Enter net engine power"/>
                </Form.Group>

                {this.state.error && <Typography variant="h6" color="secondary">Data wasn't validated</Typography>}

                <Button style={{marginTop: '20px'}} variant="primary" type="submit">Add car</Button>
            </Form>
        );
    }
}

export default CarAdder;