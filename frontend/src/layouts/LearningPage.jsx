import React, { Component } from "react";
import HeaderWeb from "../components/HeaderWeb";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar/SideBar";
import CoursCard from "../components/CoursCard/CoursCard";

class LearningPage extends Component {
  constructor(props) {
    super(props);
  }
  //<!-- -->
  render() {
    return <SideBar />;
  }
}
/*
        <a
          id="back-to-top"
          href="#"
          className="btn btn-light btn-lg back-to-top grey-text"
          role="button"
        >
          <span className="fas fa-chevron-up">Top</span>
        </a>
        */
export default LearningPage;
