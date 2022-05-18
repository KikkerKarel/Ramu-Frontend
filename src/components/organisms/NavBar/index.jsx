import React, {Component} from "react";
import { Container, Row, Col, Form } from 'react-bootstrap';
import "./index.css";
import { Navbar } from "react-bootstrap";
import Logo from "../../atoms/Logo/Small/logo";
import NoteList from '../../atoms/Icons/NoteList';
import PersonalPage from '../../atoms/Icons/Personal';
import HomeIcon from '../../atoms/Icons/Home';
import SearchIcon from '../../atoms/Icons/Search';
import MusicList from "../../molecules/MusicList";
import SearchOffCanvas from "../../molecules/Search/OffCanvas";
import SpotifyIcon from '../../atoms/Icons/Spotify';

class NavBarComponent extends Component {

    state ={
        open: false,
        canvas: false,
        redirect: false,
    }

    constructor(props) {
        super(props);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShowCanvas = this.handleShowCanvas.bind(this);
    }

    handleOpen (event) {
        if (event) {
            this.setState({ open: true });
        } else {
            this.setState({ open: false });
        }
    }

    handleShowCanvas (event) {
        if (event) {
            this.setState({ canvas: true });
        } else {
            this.setState( {canvas: false });
        }
    }

    handleClose (event) {
        if (event) {
            this.setState({ show: false });
        }
    }

    render() {
        return <Navbar className="navBar" bg="dark" variant="dark">
            <Container fluid className="navbar-container">
                <Row className="navbar-container-row">
                    <Col className="navbar-container-row-col" sm={2}>
                        <Navbar.Brand href="/">
                            <Logo />
                        </Navbar.Brand>
                    </Col>
                    <Col className="navbar-container-row-col">
                        <Container className="navigate-container" fluid>
                            <Row>
                                <Col id="col-1"><HomeIcon /></Col>
                                <Col><NoteList open={this.handleOpen} /></Col>
                                <Col id="col-3"><PersonalPage /></Col>
                            </Row>
                        </Container>
                    </Col>
                    <Col className="navbar-container-row-col" sm={2}>
                        <SpotifyIcon />
                        <SearchIcon show={this.handleShowCanvas} />
                    </Col>
                </Row>
            </Container>

            <MusicList 
                show={this.state.open}
                onHide={this.handleOpen}
            />

            <SearchOffCanvas 
                show={this.state.canvas}
                onHide={this.handleShowCanvas}
                placement="top"
                name="top"
            />
            
        </Navbar>
    }
}

export default NavBarComponent;