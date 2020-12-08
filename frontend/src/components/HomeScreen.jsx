import React, { Component } from 'react'
import HeaderWeb from './HeaderWeb';
import SearchBar from './SearchBar';
import Footer from './Footer';
import Content from "./Content";
class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.childContent = React.createRef();
	}

	updateContent = (newContent) => {
		this.childContent.current.updateContent(newContent);
	}

	render() {

		return (
			<div>
				<HeaderWeb></HeaderWeb>
				<br />
				<br />
				<br />
				<SearchBar parentCallBack = {this.updateContent}/>
				<Content ref={this.childContent} />
				<Footer />
				<br />
				<a id="back-to-top" href="#" className="btn btn-light btn-lg back-to-top grey-text" role="button">
					<span className="fas fa-chevron-up">Top</span></a>
			</div>
		)
	}
}

export default HomeScreen;