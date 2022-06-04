import { Component } from 'react';
import { Container, Image, Row, Table, Button, Spinner } from 'react-bootstrap';
import './newSong.css';
import axios from 'axios';
import queryString from 'query-string';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import CheckIcon from '../../../../../atoms/Icons/Check';

class newSongPageContainer extends Component {

    state = {
        id: '',
        artistId: '',
        artistName: '',
        name: '',
        popularity: 0,
        duration: 0,
        image: '',
        artistImage: '',
        userRating: 0,
        loading: false,
        added: false,
        inList: false
    }

    constructor(props) {
        super(props);
        this.handleAddToList = this.handleAddToList.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    async componentDidMount() {
        const urlParams = queryString.parse(window.location.pathname);
        const params = new URLSearchParams(urlParams);
        const idFromUrl = params.get('/song/id');
        await axios.get(`/ramu/api/db/song/get/id/${idFromUrl}`).then(response => {
            this.setState({
                id: response.data.id,
                artistId: response.data.artistId,
                name: response.data.name,
                popularity: response.data.popularity,
                duration: response.data.duration,
                image: response.data.image
            });
        });

        await axios.get(`/ramu/spotify/db/artist/id/${this.state.artistId}`).then(response => {
            this.setState({
                artistName: response.data.name,
                artistImage: response.data.image
            });
        });

        const token = Cookies.get("Jwt");
        const user = jwtDecode(token);
        await axios.get(`/ramu/list/get/${user.UserId}`).then(response => {
            response.data.forEach((item) => {
                if (item.artist === this.state.artistName && item.songName === this.state.name) {
                    this.setState({ inList: true });
                }
            });
        });
    }

    async handleAddToList() {
        this.setState({ loading: true });
        const token = Cookies.get("Jwt");
        const user = jwtDecode(token);
        await axios.post('/ramu/list/add', {
            userId: user.UserId,
            songName: this.state.name,
            songImage: this.state.image,
            artist: this.state.artistName,
            artistImage: this.state.artistImage,
            rating: 8
        }).then(response => {
            console.log(response);
        }).catch((err) => {
            if (user.UserId === undefined) {
                console.log("please log in to add music to your list!");
            }
        }).finally(() => {
            this.setState({ added: true });
            this.setState({ loading: false });
        });
    }

    render() {
        let added;
        let check;
        if (this.state.added || this.state.inList === true){
            added = "Added to list!";
            check = <CheckIcon />;
        } else {
            added = "Add to List"
        }
        let spinner;
        if (this.state.loading) {
            spinner = <Spinner animation="grow" variant="light" id="loading-spinner" />
        }
        return <Container fluid>
            <Row>
                <header className='header'>
                    <Row>
                        <h1 id="reveal-first" style={{ fontSize: '30px', fontFamily: 'Azonix' }}>{this.state.artistName}</h1>
                        <h1 id="reveal-after" style={{ fontSize: '50px', fontFamily: 'Azonix' }}>{this.state.name}</h1>
                        <Image id="reveal-after" className='header-song-image' src={this.state.image} />
                    </Row>
                    <Row>
                        <Table className='song-table' borderless responsive>
                            <thead id='centered'>
                                <tr style={{ fontSize: '20px', fontFamily: 'Azonix' }}>
                                    <th>Score</th>
                                    <th>Scoreboard</th>
                                    <th>Ranked</th>
                                    <th>Popularity</th>
                                    <th>Users</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ fontSize: '25px', fontWeight: 'bold' }}>
                                    <td>8</td>
                                    <td>7.95</td>
                                    <td># 35</td>
                                    <td># {this.state.popularity}</td>
                                    <td># 35,254</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                </header>
            </Row>
            <Row>
                <div id='reveal-after'>
                    <h5 style={{ marginLeft: '12.5%' }}>About {this.state.name}:</h5>
                    <p style={{ margin: 'auto', width: '75%', textAlign: 'start' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a ipsum arcu. Fusce id tristique tellus. Pellentesque vehicula fermentum accumsan. Morbi tincidunt metus sed tempus vestibulum.
                        Phasellus faucibus cursus lacus vel laoreet. Duis luctus massa diam, at volutpat massa pulvinar sit amet. Fusce pretium quam massa, nec tincidunt nisi auctor et. Fusce quam quam, pretium vel dui ac, elementum ultrices leo.
                        Nullam non dictum erat, ac tincidunt dolor. Praesent aliquet placerat venenatis.
                        Mauris accumsan sapien urna, vel volutpat augue tempor ut. Phasellus porttitor sem sed ligula posuere aliquam. Pellentesque gravida neque vel eros malesuada, id placerat est convallis. Donec volutpat gravida ante, sed bibendum nulla feugiat vitae.
                        Duis auctor dictum nulla, sit amet eleifend est. Mauris in turpis sed libero ultricies sodales vel et tortor. Maecenas quis ex viverra, placerat diam nec, congue sem. Donec non dolor finibus, facilisis nibh eu, fringilla quam. Suspendisse dignissim ut tortor vel vestibulum.
                        Aliquam sollicitudin, justo vitae eleifend elementum, dui dolor sodales eros, ac venenatis est ligula ac nisl. Ut porttitor consectetur felis ut convallis.
                    </p>
                </div>
            </Row>
            <Row>
                <Button className='addToList-button' onClick={this.handleAddToList} style={{ margin: '2% auto', width: '75%' }}>
                    {spinner}
                    {check}
                    {added}
                </Button>
            </Row>
        </Container>
    }
}

export default newSongPageContainer;