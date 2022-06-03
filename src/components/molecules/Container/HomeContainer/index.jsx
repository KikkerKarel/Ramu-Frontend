import axios from "axios";
import Cookies from "js-cookie";
import React, {Component} from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import './index.css';
import jwt from 'jwt-decode';
import { Buffer } from 'buffer';

class HomeContainer extends Component {

    state = {
        artistId: '',
        about: '',
        spotifyUrlL: ''
    }

    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this);
        this.handleWebScrapeCall = this.handleWebScrapeCall.bind(this);
    }

    async componentDidMount(){
        const token = Cookies.get("Jwt");
        const user = jwt(token);
        console.log(user.UserId);

        // const accessToken = Cookies.get("SpotifyToken");
        // const tokenHash = Buffer.from(accessToken, 'utf8').toString('base64');
        // console.log(tokenHash);
    }

    async handleClick(){
        const name = "Dreamcatcher";
        const token = Cookies.get("SpotifyToken");
        const tokenHash = Buffer.from(token, 'utf8').toString('base64');
        console.log(tokenHash);
        // await axios.get("/ramu/spotify/api/search/artist", { params: {name: name, tokenHash: tokenHash}}).then(response => {
        //     console.log(response.data);
        //     this.setState({ artistId: response.data.id });
        // });
        await axios.get(`/ramu/spotify/db/artist/${name}`).then(response => {
            console.log(response.data);
            this.setState({ 
                artistId: response.data.id,
                spotifyUrl: response.data.spotifyUrl
            });
        });
    };

    async handleWebScrapeCall(){
        // const url = "https://open.spotify.com/artist/5V1qsQHdXNm4ZEZHWvFnqQ";
        const url = this.state.spotifyUrl;
        const json = JSON.stringify({ url: url });
        console.log(json);
        await axios.post('/ramu/webscraper/scrape/about', json, {headers: { 'Content-Type': 'application/json'}})
        .then(response => {
            console.log(response.data.payload);
            this.setState({ about: response.data.payload });
        });

        await axios.put('/ramu/api/db/artist/add/about', null, {params: {
            artistId: this.state.artistId,
            about: this.state.about
        }})
        .then(response => {
            console.log(response.data);
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
                        <Row>
                        <header>#1</header>
                            <Col>
                                <Button onClick={this.handleClick}>Get Artist From Database</Button>
                            </Col>
                            <Col>
                                <Button onClick={this.handleWebScrapeCall}>Get About From the Webscraper With The API Gateway</Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    }
}

export default HomeContainer;