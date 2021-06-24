import {Component} from "react";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import "./RegistrationPage.css"
import AuthService from "../../services/auth-service"
import {Redirect} from "react-router-dom";
import {Typography} from "@material-ui/core";

class RegistrationPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            registered: false,
            error: false,
            errorMessages: []
        }
    }

    handleChange = evt => {
        this.setState({[evt.target.id]: evt.target.value})
    }

    handleSubmit = evt => {
        evt.preventDefault();

        const state = this.state;

        const user = {
            email: state.email,
            password: state.password,
            firstName: state.firstName,
            lastName: state.lastName,
            phoneNumber: state.phoneNumber,
            address: {
                street: state.street,
                houseNumber: state.houseNumber,
                apartmentNumber: state.apartmentNumber,
                city: state.city,
                zipcode: state.zipcode
            }
        }

        AuthService.register(user)
            .then(() => this.setState({registered: true}))
            .catch(err => this.setState({error: true, errorMessages: err.response.data.errors}));
    }


    render() {
        if (this.state.registered) {
            return <Redirect to="/main"/>
        }

        return (
            <Form className="Registration-page" onSubmit={this.handleSubmit}>
                <Container style={{marginTop: "20px", marginBottom: "20px", width: "30%"}}>

                    <Form.Label>Email</Form.Label>
                    <Form.Control id="email" type="email" placeholder="Enter email" onChange={this.handleChange}/>

                    <Form.Label style={{marginTop: "20px"}}>Password</Form.Label>
                    <Form.Control id="password" type="password" placeholder="Password" onChange={this.handleChange}/>

                </Container>

                <Typography variant="h6">Personal information</Typography>
                <Container style={{marginTop: "20px", marginBottom: "20px"}}>
                    <Row>
                        <Col>
                            <Form.Label>First name</Form.Label>
                            <Form.Control id="firstName" type="text" placeholder="First name"
                                          onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control id="lastName" type="text" placeholder="Last name"
                                          onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control id="phoneNumber" type="text" placeholder="Phone number"
                                          onChange={this.handleChange}/>
                        </Col>
                    </Row>
                </Container>

                <Typography variant="h6">Address</Typography>
                <Container style={{marginTop: "20px", marginBottom: "20px"}}>
                    <Row>
                        <Col>
                            <Form.Label>Street</Form.Label>
                            <Form.Control id="street" type="text" onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>House number</Form.Label>
                            <Form.Control id="houseNumber" type="text" onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Apartment number</Form.Label>
                            <Form.Control id="apartmentNumber" type="text" onChange={this.handleChange}/>
                        </Col>
                    </Row>
                </Container>
                <Container style={{marginTop: "20px", marginBottom: "20px", width: "70%"}}>
                    <Row>
                        <Col>
                            <Form.Label>City</Form.Label>
                            <Form.Control id="city" type="text" onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Zip-code</Form.Label>
                            <Form.Control id="zipcode" type="text" onChange={this.handleChange}/>
                        </Col>
                    </Row>
                </Container>
                <div style={{textAlign: "center"}}>
                    {this.state.error && this.state.errorMessages.map(message =>
                        <Typography key={message.defaultMessage} variant="h6"
                                    color="secondary">{message.defaultMessage}</Typography>)}
                    <Button style={{textAlign: "center", margin: "auto", width: "300px"}} variant="primary"
                            type="submit">
                        Register
                    </Button>
                </div>
            </Form>
        )
    }
}

export default RegistrationPage;