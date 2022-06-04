import { Component } from "react";
import SongPage from "../../molecules/Container/PageContainer/Song";
import NavBarComponent from "../../organisms/NavBar";
import NewSongPage from "../../molecules/Container/PageContainer/Song/new design/newIndex"

class SongComponent extends Component {
    render() {
        return <>
            <NavBarComponent />
            {/* <SongPage /> */}
            <NewSongPage />
        </>
    }
}

export default SongComponent;