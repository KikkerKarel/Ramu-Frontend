import React, { Component } from 'react';
import { Carousel, Container, Row, Button } from 'react-bootstrap';
import './artist.css';
import axios from 'axios';
import queryString from 'query-string';
import SongsList from '../../../SongsList';

function commafy(num) {
    var str = num.toString().split(',');
    if (str[0].length >= 5) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 5) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

class ArtistPageContainer extends Component {

    state = {
        id: "",
        name: "",
        followers: 0,
        popularity: 0,
        image: "",
        banner: "",
        about: "",
        popUp: false
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        const urlParams = queryString.parse(window.location.pathname);
        const params = new URLSearchParams(urlParams);
        const idFromUrl = params.get('/artist/id');
        await axios.get(`/ramu/spotify/db/artist/id/${idFromUrl}`).then(response => {
            console.log(response.data);
            this.setState({
                id: response.data.id,
                name: response.data.name,
                followers: response.data.followers,
                popularity: response.data.popularity,
                image: response.data.image,
                banner: response.data.banner,
                about: response.data.about
            });
        });
    }

    handleClick(event) {
        if (event) {
            this.setState({ popUp: true });
        } else {
            this.setState({ popUp: false });
        }
    }

    render() {
        let songsList;
        if (this.state.popUp) {
            songsList = <SongsList show={this.state.popUp} onHide={this.handleClick} artistname={this.state.name} artistid={this.state.id} />
        }
        return <Container className="artist-container" fluid>
            <Row style={{ backgroundImage: `url(${this.state.banner})`, backgroundRepeat: "no-repeat" }} className="artist-header-row parallax">
                {/* <Col className="artist-header-row-col">
                    <Row id="row-1">
                        <Col className="artist-image-background-col" md={4}>
                            <h3>Spotify followers:</h3>
                            <h3>{this.state.followers}</h3>
                        </Col>
                        <Col className="artist-image-background-col" md={4}>
                            <h2>{this.state.popularity}</h2>
                        </Col>
                        <Col className="artist-image-background-col" md={4}>
                            <text>Top 100 Column</text>
                        </Col>
                    </Row>
                    <Row id="row-2">
                        <Col>
                             <h1 id='aas'>{this.state.name}</h1>
                        </Col>
                    </Row>
                </Col> */}
                <h1 className="revealUp">{this.state.name}</h1>
            </Row>
            <Row className='artist-description-row'>
                <Row id="flex" style={{ height: '50vh' }}>
                    <Carousel className="carousel">
                        <Carousel.Item id='carousel-item' interval={5000}>
                            <div className='space-evenly'>
                                <h1 id='azonix'>Followers: {commafy(this.state.followers)}</h1>
                                <h1 id='azonix'>Popularity: {this.state.popularity}</h1>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item id='carousel-item' interval={5000}>
                            <text>{this.state.about}</text>
                        </Carousel.Item>
                    </Carousel>
                </Row>
                <Row id="flex">
                    <Button className="songsList-btn" onClick={this.handleClick}>Check out {this.state.name}'s songs</Button>
                </Row>
            </Row>
            {songsList}
        </Container>
    }
}

export default ArtistPageContainer;