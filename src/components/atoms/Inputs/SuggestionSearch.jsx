import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import '../../molecules/Search/OffCanvas/Top/index.css';
import { createTheme, ThemeProvider } from '@mui/material';
import Box from '@mui/material/Box';
import { Carousel } from 'react-bootstrap';

export function SuggestionSearchArtist(props) {

    var newlist = props.list;
    const theme = createTheme({
        components: {
            MuiAutocomplete: {
                styleOverrides: {
                    option: {
                        // borderBottom: '1px solid grey',
                        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Stack sx={{ width: '93%' }}>
                <Autocomplete
                    freeSolo
                    id="canvas-searchbar-control"
                    disableClearable
                    options={newlist}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Search ..."
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0} }} {...props}>
                            <img
                                loading='lazy'
                                width='40'
                                src={`${option.image}`}
                                alt=""
                            />
                            {option.name}
                        </Box>
                    )}
                    onChange={(e) => props.search(e)}
                />
            </Stack>
        </ThemeProvider>
    )
};

export function SuggestionSearchSong(props) {

    var newlist = props.list;
    const theme = createTheme({
        components: {
            MuiAutocomplete: {
                styleOverrides: {
                    option: {
                        // borderBottom: '1px solid grey',
                        boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Stack sx={{ width: '93%' }}>
                <Autocomplete
                    freeSolo
                    id="canvas-searchbar-control"
                    disableClearable
                    options={newlist}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                        <TextField
                        {...params}
                        label="Search ..."
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            }}
                        />
                    )}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0} }} {...props}>
                            <img
                                loading='lazy'
                                width='40'
                                src={`${option.image}`}
                                alt=""
                            />
                            {option.name}
                        </Box>
                    )}
                    onChange={(e) => props.search(e)}
                />
            </Stack>
        </ThemeProvider>
    )
}