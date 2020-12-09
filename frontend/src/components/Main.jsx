import React, { Component } from 'react';
import Header from './Header';
import CardContainer from './CardContainer';
import './Flashcard.scss';
import HeaderWeb from './HeaderWeb';
class Main extends Component {
    render() {
        return (
          <div className='wrapper'>
              <HeaderWeb />
              <br />
              <br />
              <br />
            <Header />
            <div className='content-wrapper'>
              <CardContainer />
            </div>
          </div>
        );
      }
}

export default Main;