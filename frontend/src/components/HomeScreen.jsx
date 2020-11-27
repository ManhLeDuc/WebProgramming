import React, { Component } from 'react'
import HeaderWeb from './HeaderWeb';
import SearchBar from './SearchBar';
import Footer from './Footer';
class HomeScreen extends Component {

	render() {

		return (
			<div>
				<HeaderWeb></HeaderWeb>
				<br />
				<br />
				{/* <br /> */}
				<SearchBar />
				<div className="container">
					<div className="row">
						<div className="col-8">
							<div className="form-group" >
								<label for="exampleFormControlTextarea1">Content textarea</label>
								<textarea readonly='readonly' className="form-control" id="exampleFormControlTextarea1" rows="50" >
									<span>alclkasnckj</span>
								</textarea>
							</div>
						</div>
						<div className="col-4">
							<div className="container">

								<div className="row d-flex justify-content-center">

									<div className="col-md-6">

										<label for="exampleFormControlTextarea1">Video textarea</label>
										<div className="embed-responsive embed-responsive-16by9 ">
											<iframe className="embed-responsive-item" src="https://www.youtube.com/embed/vlDzYIIOYmM"
												allowfullscreen></iframe>
										</div>

									</div>

								</div>

							</div>

							<div className="footer-copyright text-center py-3">© 2020 Copyright:
								<a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
							</div>

						</div>
					</div>
				</div>
				<Footer />
				<a id="back-to-top" href="#" class="btn btn-light btn-lg back-to-top" role="button">
					<i class="fas fa-chevron-up"></i></a>
			</div>
		)
	}
}

export default HomeScreen;