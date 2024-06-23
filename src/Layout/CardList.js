import React from "react";
import Card from "./Card";

function CardList({ cards, setFetchDeckInfo }) {
  return (
    <>
      <h3>Cards</h3>
      <table>
        {cards.length !== 0
          ? cards.map((card) => (
              <Card card={card} setFetchDeckInfo={setFetchDeckInfo} />
            ))
          : "No cards"}
      </table>
    </>
  );
}

export default CardList;
