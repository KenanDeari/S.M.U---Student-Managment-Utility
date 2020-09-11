import React, { Component } from "react";
import NavTabs from "./NavTabs";
// import Notes from "./pages/Notes";
import Events from "./pages/Events";
import Articles from "./pages/Articles";
import Videos from "./pages/Videos";
import Header from "../containers/Header/Header";
// import About from "./pages/About";
// import Blog from "./pages/Blog";
// import Contact from "./pages/Contact";

class Navbar extends Component {
    state = {
        currentPage: "Jobs"
    };

    handlePageChange = page => {
        this.setState({ currentPage: page });
    };

    renderPage = () => {
        if (this.state.currentPage === "Jobs") {
            return <Header />;
        } else if (this.state.currentPage === "Events") {
            return <Events />;
        } else if (this.state.currentPage === "Articles") {
            return <Articles />;
        } else {
            return <Videos />;
        }
    };

    render() {
        return (
            <div>
                <NavTabs
                    currentPage={this.state.currentPage}
                    handlePageChange={this.handlePageChange}
                />
                {this.renderPage()}
            </div>
        );
    }
}

export default Navbar;