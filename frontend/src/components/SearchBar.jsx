import React, { Component } from 'react'
//import hihi from '../static/image/138254.svg'
export default class SearchBar extends Component {


    render() {
        return (
            <div className="input-group input-group-lg md-form form-sm form-1 pl-0 border border-success" >
                <div className="input-group-prepend ">
                    <span className="input-group-text cyan lighten-2 " id="basic-text1"><i class="fas fa-search text-dark"
                        aria-hidden="true"></i></span>
                </div>
                <input className="form-control my-0 py-1 text-dark" type="text" placeholder="Search" aria-label="Search" />
            </div>





        )
    }
}