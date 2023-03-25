import React, { Component } from 'react';
import { Offcanvas, Form, Dropdown } from 'react-bootstrap';
import './index.css';
import SearchIcon from '../../../../atoms/Icons/Search';
import axios from 'axios';
import { SuggestionSearchArtist, SuggestionSearchSong } from '../../../../atoms/Inputs/SuggestionSearch';

class SearchOffCanvas extends Component {

    state = {
        open: false,
        show: Boolean,
        songs: [],
        artists: [],
        redirect: false,
        searchValue: ""
    }

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
    }

    async componentDidMount() {
        this.setState({ searchValue: "Song" });

        await axios.get("/ramu/api/db/song/get/all").then(response => {
            this.setState({
                songs: response.data
            });
        });
        await axios.get("/ramu/api/db/artist/get/all").then(response => {
            this.setState({
                artists: response.data
            })
        });
    };

    handleClose() {
        if (this.state.show === false) {
            this.setState({ open: true });
        }
    }

    handleShow() {
        if (this.state.show) {
            this.setState({ open: true });
        }
    }

    handleSearch(e) {
        if (e.target.innerText !== null && this.state.searchValue === "Artist")
        {
            var artist = this.state.artists.find(art => art.name === e.target.innerText);
            window.location.href = `/artist/id=${artist.id}`;
        } else if (e.target.innerText !== null && this.state.searchValue === "Song")
        {
            var song = this.state.songs.find(s => s.name === e.target.innerText);
            window.location.href = `/song/id=${song.id}`;
        }
    };

    handleDropdown(e) {
        this.setState({ searchValue: e.target.innerText });
        console.log(this.state.searchValue);
    }

    render () {
        let searchCondition;
        if (this.state.searchValue === "Artist")
        {
            searchCondition = <SuggestionSearchArtist list={this.state.artists} search={this.handleSearch} />;
        } else if (this.state.searchValue === "Song")
        {
            searchCondition = <SuggestionSearchSong list={this.state.songs} search={this.handleSearch} />;
        }

        return <Offcanvas id='offcanvas' {...this.props}>
            <Offcanvas.Body className="search-canvas-body">
                <Dropdown className='search-dropdown' align='end'>
                    <Dropdown.Toggle id="dropdown-basic">
                        {this.state.searchValue}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={this.handleDropdown}>Song</Dropdown.Item>
                        <Dropdown.Item onClick={this.handleDropdown}>Artist</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Form className="canvas-searchbar">
                    {searchCondition}
                    <SearchIcon />
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    }
}


export default SearchOffCanvas;