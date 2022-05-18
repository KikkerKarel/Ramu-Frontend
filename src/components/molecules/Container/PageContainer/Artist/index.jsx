import React, { Component } from 'react';
import { Carousel, Col, Container, Row, } from 'react-bootstrap';
import './artist.css';
import '../../background.css';
import axios from 'axios';
// import chanminaHeader from '../../../../../images/ChanminaHeader.png';
// import '../../../../atoms/Animations/parallaxHeader';
import queryString from 'query-string';

class ArtistPageContainer extends Component {

    state = {
        id: "",
        name: "",
        followers: 0,
        popularity: 0,
        image: "",
        banner: ""
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
                banner: response.data.banner
            });
        });
    }

    render() {
        return <Container className="artist-container" fluid>
            <Row style={{ backgroundImage: `url(${this.state.banner})`, backgroundRepeat: "no-repeat"}} className="artist-header-row layer parallax">
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
                <Row className="row-revealUp">
                    {/* <Col>
                        <text>Info Column</text>
                    </Col>
                    <Col>
                        <text>Description Column</text>
                    </Col> */}
                    <Carousel>
                        <Carousel.Item interval={2000}>
                            <text>Info column</text>
                        </Carousel.Item>
                        <Carousel.Item interval={2000}>
                            <text>Description Column</text>
                        </Carousel.Item>
                    </Carousel>
                </Row>
            </Row>
        </Container>
    }
}

export default ArtistPageContainer;