import React, {Component} from "react";
import HomeContainer from "../../molecules/Container/HomeContainer";
import NavBar from "../../organisms/NavBar";

class HomeComponent extends Component {

    render () {
        return <>
            <NavBar />
            <HomeContainer />
        </>
    }
}

export default HomeComponent;