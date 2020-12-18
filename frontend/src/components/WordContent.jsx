import React, { Component } from "react";
//import hihi from '../static/image/138254.svg'
import DataContent from "./DataContent";
export default class WordContent extends Component {
  state = {
    word: "",
    pronunciation: "",
    datas: [],
    collocations: [],
  };

  updateContent = async (content) => {
    try {
      const result = await fetch(
        `http://localhost:3001/api/v1/words/${content}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      ).then((res) => {
        return res.json();
      });
      console.log(result);
      if (result.success) {
        this.setState({
          word: result.data.word,
          pronunciation: result.data.pronunciation,
          datas: result.data.datas,
        });
      } else {
        window.alert(result.message);
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <h2>{this.state.word}</h2>
          <h3>{this.state.pronunciation}</h3>
        </div>
        {this.state.datas.map((value, index) => {
          return (
            <DataContent
              type={value.type}
              meanings={value.meanings}
            ></DataContent>
          );
        })}
      </div>
    );
  }
}
