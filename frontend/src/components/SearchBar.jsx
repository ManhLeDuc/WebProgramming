import React, { Component } from 'react'

export default class SearchBar extends Component {
    
    state = {
        currentWord: "",
        regexWords: [],
    }

    handleChange = async (e) => {
        this.setState({ currentWord: e.target.value });
        if (e.target.value !== "") {
            try {
                const result = await fetch(`http://localhost:3001/api/wordsByRegex/${e.target.value}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                }).then((res) => { return res.json(); });
                this.setState({
                    regexWords: result.data,
                });
            }
            catch (error) {
                window.alert(error.message);
            }
        }
        else {
            this.setState({
                regexWords: []
            })
        }

    };

    handleSuggestClick = (selectedWord) => {
        this.setState({
            currentWord: selectedWord,
            regexWords: [],
        })
    };

    searchWord = (event) => {
        event.preventDefault();
        this.props.parentCallBack(this.state.currentWord);
        this.setState({
            regexWords: [],
        });
    }

    render() {

        return (
            <div className="container" >
                <form onSubmit={this.searchWord}>
                    <input className="form-control my-0 text-dark" type="text" placeholder="Search" aria-label="Search"
                        value={this.state.currentWord}
                        onChange={this.handleChange}  
                    />
                    
                </form>

                <div className="list-group">
                    {this.state.regexWords.map((value, index) => {
                        return (
                            <div className="list-group-item list-group-item-action list-group-item-light" role="alert" onClick={() => {
                                this.handleSuggestClick(value.word);
                            }}>
                                { value.word}
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }
}