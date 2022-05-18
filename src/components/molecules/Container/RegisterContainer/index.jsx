import React, { Component } from 'react';
import { Container, Row, Col, Form, Button, NavLink, Image, Spinner } from 'react-bootstrap';
import '../LoginContainer/index.css';
import "../background.css";
import Logo from '../../../atoms/Logo/Big/logo';
import RegisterImage from "../../../../images/Image 3.svg";
import Authservice from '../../../../service/auth.service';

let newDate = new Date().toISOString().split('.')[0];

class RegisterContainer extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    state = {
        loading: false,
        email: '',
        dateofbirth: new Date().toISOString().split('T')[0],
        username: '',
        passwordHash: '',
        createdDate: new Date().toISOString().split('.')[0]
    }

    handleClick() {
        console.log(this.state);
        Authservice.register(this.state.email, this.state.dateofbirth, this.state.username, this.state.passwordHash, this.state.createdDate).then(data => {
            console.log(data);
            window.location.replace("/");
        });
    }

    
    render () {
        return <div className='background'>
            <Container fluid className="generalContainer">
                <Row>
                    <Col id="container-row-col" md={3}>
                        <Logo />
                        <Form id="main-form">
                            <Form.Group className="mb-3">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control onChange={(event) => {this.setState({ email: event.target.value })}} type='text' id="input-text"  />
                            </Form.Group>
                            {/* <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type='text' id="input-text" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type='text' id="input-text" />
                            </Form.Group> */}
                            <Form.Group className="mb-3">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control onChange={(event) => {this.setState({ dateofbirth: event.target.value })}} type='date' id="input-text" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange={(event) => {this.setState({ username: event.target.value })}} type='text' id="input-text" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(event) => {this.setState({ passwordHash: event.target.value })}} type='password' />
                            </Form.Group>
                        </Form>
                        <div className="action-div">
                            <Button type="button" id="login-register-button" onClick={this.handleClick}>Register</Button>
                            <NavLink className="action-link" href='/login'>Cancel Registration</NavLink>
                        </div>  
                    </Col>
                    <Col>
                        <Image className="login-register-image" src={RegisterImage} fluid />
                    </Col>
                </Row>
            </Container>
        </div>
    }
}

export default RegisterContainer;