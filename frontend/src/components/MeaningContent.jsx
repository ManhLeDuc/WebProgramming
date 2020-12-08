import React, { Component } from 'react';
import ExampleContent from './ExampleContent'
class MeaningContent extends Component {

  render() {
    return (

      <div>
        <div className="row">
          <h4>{this.props.data}</h4>
        </div>
        {this.props.examples.map((value, index) => {
          return (
            <ExampleContent data={value.data} examples={value.examples}></ExampleContent>
          )
        })}
      </div>

    );
  }
}

export default MeaningContent;