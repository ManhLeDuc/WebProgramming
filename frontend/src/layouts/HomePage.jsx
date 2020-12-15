import React, { Component } from "react";
import HeaderWeb from "../components/HeaderWeb";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import Content from "../components/Content";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.childContent = React.createRef();
  }

  updateContent = (newContent) => {
    this.childContent.current.updateContent(newContent);
  };

  render() {
    return (
      <div>
        <HeaderWeb></HeaderWeb>
        <br />
        <br />
        <br />
        <SearchBar parentCallBack={this.updateContent} />
        <Content ref={this.childContent} />
        <Footer />
        <br />
        <a
          id="back-to-top"
          href="#"
          className="btn btn-light btn-lg back-to-top grey-text"
          role="button"
        >
          <span className="fas fa-chevron-up">Top</span>
        </a>
      </div>
    );
  }
}

export default HomePage;
