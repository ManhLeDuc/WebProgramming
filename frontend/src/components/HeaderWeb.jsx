import React, { Component } from 'react'
//import hihi from '../static/image/138254.svg'
export default class HeaderWeb extends Component {


    render() {
        return (
            <div>
                <header className="section-header">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
                        <a className="navbar-brand" href="#">
                            <img src="C:\Dict-webproject\WebProgramming\frontend\src\snow-icon-png-8.jpg"
                                height="28" alt="Dict" />
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Thesaurus</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Studying</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#">Disabled</a>
                                </li>
                            </ul>


                        </div>
                        <ul className="nav navbar-nav navbar-right" >
                            {/* <li><a href="#"> */}
                            {/* <span className="glyphicon glyphicon-user"> </span> Sign Up </a></li> */}

                            <li><a href="#"><span className="glyphicon glyphicon-log-in"> </span> Login</a></li>
                        </ul>
                    </nav>
                </header>
            </div>
        )
    }
}