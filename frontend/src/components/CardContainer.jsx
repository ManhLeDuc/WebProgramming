import React, { Component } from "react";

import Card from "./Card";
import CreateCard from "./CreateCard";
import "./../css/Flashcard.scss";
import { fromJS } from "immutable";

class CardContainer extends Component {
  constructor() {
    super();
    this.state = {
      cards: fromJS([
        {
          word: "Jazz",
          description:
            "A type of music of black American origin characterized by improvisation, syncopation, and usually a regular or forceful rhythm, emerging at the beginning of the 20th century.",
        },
        {
          word: "Reggae",
          description: "Music like Bob Marley, man.",
        },
        {
          word: "Folk",
          description: "Music like Bob Dylan, man.",
        },
      ]),
      cardNumber: 0,
    };
    this.boundCallback = this.hideCreateCard.bind(this);
    this.boundCreateCard = this.setCard.bind(this);
    this.boundShowPrevCard = this.showPrevCard.bind(this);
    this.boundShowNextCard = this.showNextCard.bind(this);
  }

  hideCreateCard() {
    this.setState({ showModal: false });
  }

  showNextCard() {
    if (this.state.cardNumber + 1 !== this.state.cards.size) {
      this.setState({ cardNumber: (this.state.cardNumber += 1) });
    }
  }

  showPrevCard() {
    if (this.state.cardNumber !== 0) {
      this.setState({ cardNumber: (this.state.cardNumber -= 1) });
    }
  }

  setCard(card) {
    const newCards = this.state.cards.push(card);
    this.setState({ cards: newCards });
  }

  //   generateDots() {
  //     const times = this.state.cards.size;
  //     let arr = [];
  //     _.times(times).forEach((num) => {
  //       const dotClass = num  === this.state.cardNumber ? 'active' : '';
  //       arr.push(
  //         <span
  //           className={`card-container__dot fa fa-circle ${dotClass}`}
  //           onClick={() => this.setState({cardNumber: num})}
  //         />
  //       )
  //     });
  //     return arr;
  //   }

  generateCards() {
    const cards = this.state.cards;
    const cardsList = cards.map((card) => {
      return (
        <Card
          frontContent={card.get("word")}
          backContent={card.get("description")}
          showNextCard={this.boundShowNextCard}
          showPrevCard={this.boundShowPrevCard}
          cardNumber={this.state.cardNumber}
        />
      );
    });
    return cardsList.toJS()[this.state.cardNumber];
  }
  render() {
    return (
      <div>
        <span
          className="card-container__icon  fa fa-plus"
          onClick={() => {
            this.setState({ showModal: !this.state.showModal });
          }}
        />
        {this.state.showModal ? (
          <CreateCard
            onShadowClick={this.boundCallback}
            onCreateCard={this.boundCreateCard}
          />
        ) : (
          ""
        )}
        {this.generateCards()}
        {/* <div className='card-container__dots-wrapper'>
              {this.generateDots()}
            </div> */}
      </div>
    );
  }
}

export default CardContainer;
