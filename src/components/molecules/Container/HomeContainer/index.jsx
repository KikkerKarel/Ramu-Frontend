import axios from "axios";
import Cookies from "js-cookie";
import React, {Component} from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import './index.css';


class HomeContainer extends Component {

    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(){
        const name = "Dreamcatcher";
        const token = Cookies.get("SpotifyToken");
        const tokenHash = btoa(token);
        console.log(tokenHash);
        await axios.get("/ramu/spotify/api/search/artist", { params: {name: name, tokenHash: tokenHash}}).then(response => {
            console.log(response.data);
        });
    };

    render () {
        return <Container className="home-container" fluid>
            <Row className="home-container-row">
                <Col className="home-container-row-col">
                    <header>This weeks</header>
                </Col>
            </Row>
            <Row className="home-container-row-2">
                <Col>
                    <div className="numberOne-div">
                        <header>#1</header>
                        <Button onClick={this.handleClick}>Get Artist From Database</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    }
}

export default HomeContainer;