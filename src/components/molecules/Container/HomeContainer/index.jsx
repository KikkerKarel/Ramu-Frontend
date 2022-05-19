import axios from "axios";
import Cookies from "js-cookie";
import React, {Component} from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import './index.css';
import jwt from 'jwt-decode';


class HomeContainer extends Component {

    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount(){
        const token = Cookies.get("Jwt");
        const user = jwt(token);
        console.log(user.UserId);
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

    async handleWebScrapeCall(){
        const url = "https://open.spotify.com/artist/5V1qsQHdXNm4ZEZHWvFnqQ";
        const json = JSON.stringify({ url: url });
        console.log(json);
        await axios.post('/ramu/webscraper/scrape/about', json, {headers: { 'Content-Type': 'application/json'}})
        .then(response => {
            console.log(response.data.payload);
        });
    }

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
                        <Button onClick={this.handleWebScrapeCall}>Get About From the Webscraper With The API Gateway</Button>
                    </div>
                </Col>
            </Row>
        </Container>
    }
}

export default HomeContainer;