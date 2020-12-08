import React, { Component } from 'react'
import HeaderWeb from './HeaderWeb';
import SearchBar from './SearchBar';
import Footer from './Footer';
import Content from "./Content";
class HomeScreen extends Component {

	render() {

		return (
			<div>
				<HeaderWeb></HeaderWeb>
				<br />
				<br />
				<br />
				{/* <br /> */}
				<SearchBar />
				<Content />
				<Footer />
				<br />
				<a id="back-to-top" href="#" className="btn btn-light btn-lg back-to-top grey-text" role="button">
					<span className="fas fa-chevron-up">Top</span></a>
			</div>
		)
	}
}

export default HomeScreen;