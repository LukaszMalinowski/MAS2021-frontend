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
            error: false
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

        console.log(user)

        AuthService.register(user)
            .then(() => this.setState({registered: true}))
            .catch(() => this.setState({error: true}))
    }


    render() {
        if(this.state.registered) {
            return <Redirect to="/main"/>
        }

        return (
            <Form className="Registration-page" onSubmit={this.handleSubmit}>
                <Container style={{marginTop: "20px", marginBottom: "20px"}}>
                    <Row>
                        <Col>
                            <Form.Label>Email</Form.Label>
                            <Form.Control id="email" type="email" placeholder="Enter email" onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Password</Form.Label>
                            <Form.Control id="password" type="password" placeholder="Password" onChange={this.handleChange}/>
                        </Col>
                    </Row>
                </Container>

                <Container style={{marginTop: "20px", marginBottom: "20px"}}>
                    <Row>
                        <Col>
                            <Form.Label>First name</Form.Label>
                            <Form.Control id="firstName" type="text" placeholder="First name" onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Last name</Form.Label>
                            <Form.Control id="lastName" type="text" placeholder="Last name" onChange={this.handleChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control id="phoneNumber" type="text" placeholder="Phone number" onChange={this.handleChange}/>
                        </Col>
                    </Row>
                </Container>

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
                    {this.state.error && <Typography variant="h6" color="secondary">An error occurred. Try again</Typography>}
                    <Button style={{textAlign: "center", margin: "auto"}} variant="primary" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        )
    }
}

export default RegistrationPage;