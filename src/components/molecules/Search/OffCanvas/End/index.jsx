import React, { Component } from "react";
import { Offcanvas } from "react-bootstrap";
import './index.css';
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { SearchBar, ArtistSearchList, SongSearchList } from "../../../../atoms/Inputs/CustomSearch";
import { artistList, songList } from "../../../../../utils/lists";


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

class SearchOffCanvasEnd extends Component {

    state = {
        open: false,
        show: Boolean,
        songs: [],
        artists: [],
        redirect: false,
        searchValue: "",
        value: 0,
        keyword: "",
        newListArtist: artistList,
        newListSong: songList
    }

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateKeywordArtist = this.updateKeywordArtist.bind(this);
        this.updateKeywordSong = this.updateKeywordSong.bind(this);
    }

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
        if (e.target.innerText !== null && this.state.value === 0) {
            var artist = this.state.newListArtist.find(art => art.name === e.target.innerText);
            window.location.href = `/artist/id=${artist.id}`;
        } else if (e.target.innerText !== null && this.state.value === 1) {
            var song = this.state.newListSong.find(s => s.name === e.target.innerText);
            window.location.href = `/song/id=${song.id}`;
        }
    };

    handleChange(event, newValue) {
        this.setState({ value: newValue });
    }

    updateKeywordArtist(keyword) {
        const filtered = artistList.filter(artist => {
            return `${artist.name.toLowerCase()}`.includes(keyword.toLowerCase());
        })
        this.setState({ 
            keyword: keyword,
            newListArtist: filtered
        });
    }
    updateKeywordSong(keyword) {
        const filtered = songList.filter(artist => {
            return `${artist.name.toLowerCase()}`.includes(keyword.toLowerCase());
        })
        this.setState({ 
            keyword: keyword,
            newListSong: filtered
        });
    }

    render() {
        return <Offcanvas id="bg-color" {...this.props}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Search</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="canvas-end-body">
                <Tabs 
                style={{ position: 'sticky', top: 0 }} 
                value={this.state.value} 
                onChange={this.handleChange} 
                indicatorColor="secondary"
                aria-label="basic tabs example" 
                variant="fullWidth"
                textColor="inherit"
                >
                    <Tab label="Artist" {...a11yProps(0)} />
                    <Tab label="Song" {...a11yProps(1)} />
                </Tabs>
                
                <TabPanel value={this.state.value} index={0}>
                    <SearchBar keyword={this.state.keyword} onChange={this.updateKeywordArtist} />
                    <ArtistSearchList artistList={this.state.newListArtist} onClick={this.handleSearch} />
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <SearchBar keyword={this.state.keyword} onChange={this.updateKeywordSong} />
                    <SongSearchList songList={this.state.newListSong} onClick={this.handleSearch} />
                </TabPanel>

            </Offcanvas.Body>
        </Offcanvas>

    }
}

export default SearchOffCanvasEnd;