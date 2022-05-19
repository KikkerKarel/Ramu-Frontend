import React, { Component } from "react";
import { Container, Row, Col, Form, Button, NavLink, Image, Spinner } from "react-bootstrap";
import "./index.css";
import "../background.css";
import Logo from '../../../atoms/Logo/Big/logo';
import LoginPicture from '../../../../images/Image 2.svg';
import AuthService from '../../../../service/auth.service';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

class LoginContainer extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    state = {
        redirect: false,
        loading:false,
        username: '',
        password: ''
    }

    async handleClick () {
        this.setState({loading:true});
        await AuthService.login(this.state.username, this.state.password).then(data => {
            console.log(data);
            Cookies.set("Jwt", data.data);
            this.setState({ redirect: true });
        });
    } 

    render () {
        if (this.state.redirect || AuthService.isLoggedIn())
        {
            return <Navigate to="/" />
        }
        const loading = this.state.loading;
        let spinner;
        if (loading) {
            spinner = <Spinner animation="grow" variant="dark" id="loading-spinner" />
        }
        return <div className="background">
            <Container fluid className="generalContainer">
                <Row>
                    <Col id="container-row-col" md={3}>
                        <Logo />
                        <Form className="login-form" >
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control onChange={(event) => { this.setState({ username: event.target.value })}} type="text" id="input-text" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={(event) => { this.setState({ password: event.target.value })}} type="password" />
                            </Form.Group>
                        </Form>
                        <div className="action-div">
                            <Button type="button" id="login-register-button" onClick={this.handleClick}>Login {spinner}</Button>
                            
                            <NavLink className="action-link">Forgot password?</NavLink>
                            <NavLink href="/register" className="action-link" id="second">Click here to register</NavLink> 
                        </div>  
                    </Col>
                    <Col>
                        <Image className="login-register-image" fluid src={LoginPicture} />
                    </Col>
                </Row>
            </Container>
        </div>
        
    }
}

export default LoginContainer;