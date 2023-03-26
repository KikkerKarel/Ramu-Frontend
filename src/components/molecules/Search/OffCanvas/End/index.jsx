import React, { Component } from "react";
import { Offcanvas, Table } from "react-bootstrap";
import './index.css';
import chan from '../../../../../images/chan.png';

import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import SearchBar from "../../../../atoms/Inputs/CustomSearch";

const list = [
    { image: chan, name: "Chanmina" },
    { image: "", name: "Justin Bieber" },
    { image: "", name: "Awich" },
    { image: "", name: "Red Velvet" },
    { image: "", name: "Dreamcatcher" },
    { image: "", name: "The Weeknd" },
    { image: "", name: "Blackpink" },
    { image: "", name: "Yeeun" },
    { image: "", name: "Aespa" },
    { image: "", name: "Purple Kiss" },
    { image: "", name: "Yoasobi" },
    { image: "", name: "Jiu" },
    { image: "", name: "Yuu Shinoda" },
    { image: "", name: "Joyner Lucas" },
    { image: "", name: "Tim" },
    { image: "", name: "Twice" },
    { image: "", name: "BTS" },
]


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
        newList: list
    }

    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateKeyword = this.updateKeyword.bind(this);
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
        if (e.target.innerText !== null && this.state.searchValue === "Artist") {
            var artist = this.state.artists.find(art => art.name === e.target.innerText);
            window.location.href = `/artist/id=${artist.id}`;
        } else if (e.target.innerText !== null && this.state.searchValue === "Song") {
            var song = this.state.songs.find(s => s.name === e.target.innerText);
            window.location.href = `/song/id=${song.id}`;
        }
    };

    handleChange(event, newValue) {
        this.setState({ value: newValue });
    }

    updateKeyword(keyword) {
        const filtered = list.filter(artist => {
            return `${artist.name.toLowerCase()}`.includes(keyword.toLowerCase());
        })
        this.setState({ 
            keyword: keyword,
            newList: filtered
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
                    <SearchBar keyword={this.state.keyword} onChange={this.updateKeyword} />
                    <div className="search-result-container">
                        <Table responsive hover>
                            {this.state.newList.map((item, index) => {
                                return (
                                    <tbody style={{ border: 'none' }} id="box-shadow">
                                        <tr>
                                            <td style={{ border: 'none' }}><img src={item.image} loading="lazy" width="50" /></td>
                                            <td style={{ border: 'none' }}>{item.name}</td>
                                        </tr>
                                    </tbody>
                                )
                            })}
                        </Table>
                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    Item Two
                </TabPanel>

            </Offcanvas.Body>
        </Offcanvas>

    }
}

export default SearchOffCanvasEnd;