import React, { Component } from 'react'
import WordContent from './WordContent'
//import hihi from '../static/image/138254.svg'
export default class Content extends Component {

	constructor(props) {
		super(props);
		this.childContent = React.createRef();
	}

	updateContent = (newContent) => {
		this.childContent.current.updateContent(newContent);
	}

	render() {

		return (
			<div className="container">
				<div className="row">
					<div className="col-8">
						<WordContent ref={this.childContent}></WordContent>
					</div>
					<div className="col-4">
						<div className="container">

							<div className="row d-flex justify-content-center">

								<div className="col-md-10">

									<label for="exampleFormControlTextarea1">Video textarea</label>
									<div className="embed-responsive embed-responsive-16by9 ">
										{/* <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/vlDzYIIOYmM"
											allowfullscreen></iframe> */}
											<iframe title="Youtube Ad" width="560" height="315" src="https://www.youtube.com/embed/TI-pfeaErY4" 
											frameborder="0" 
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
											allowfullscreen></iframe>
									</div>
									<div className="card my-4">
										<h5 className="card-header">Categories</h5>
										<div className="card-body">
											<div className="row">
												<div className="col-lg-6">
													<ul className="list-unstyled mb-0">
														<li>
															Web Design
														</li>
														<li>
															HTML
														</li>
														<li>
															Freebies
														</li>
													</ul>
												</div>
												<div className="col-lg-6">
													<ul className="list-unstyled mb-0">
														<li>
															JavaScript
														</li>
														<li>
															CSS
														</li>
														<li>
															Tutorials
														</li>
													</ul>
												</div>
											</div>
										</div>
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





		)
	}
}