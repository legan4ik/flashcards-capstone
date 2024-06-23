import React from "react";
import BreadCrumb from "./Breadcrumb";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api";

function Study() {
  const [deck, setDeck] = useState(false);
  const [num, setNum] = useState(0);
  const [nextCard, setNextCard] = useState(false);
  const [cardText, setCardText] = useState("");
  let { deckId } = useParams();
  const navigate = useNavigate();
  const handleRestartCards = () => {
    if (window.confirm("Restart cards?") === true) {
      setNum(0);
      setCardText("");
      setNextCard(false);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    async function loadInfo() {
      const response = await readDeck(deckId, abortController.signal);
      await setDeck(response);
    }
    loadInfo();
    return () => {
      abortController.abort(); // Cancels any pending request or response
      //setDeck({})
    };
  }, [deckId]);

  const flipCard = () => {
    if (cardText === deck.cards[num].back) {
      setCardText(deck.cards[num].front);
      setNextCard(false);
    } else {
      setCardText(deck.cards[num].back);
      setNextCard(true);
    }
  };

  const showNextCard = () => {
    if (num > deck.cards.length - 2) {
      handleRestartCards();
    } else {
      setCardText(deck.cards[num + 1].front);
      setNum(num + 1);
      setNextCard(false);
    }
  };

  if (!deck || !deck.cards) {
    return <h2>Loading...</h2>;
  } else {
    const cardsCount = deck.cards.length;
    const breadcrumbs = [
      { name: deck.name, last: false, link: `/decks/${deck.id}` },
      { name: "Study", last: true },
    ];
    let txt = cardText ? cardText: deck.cards[0].front
    return (
      <>
        <BreadCrumb items={breadcrumbs}></BreadCrumb>
        <h2> {deck.name}: Study</h2>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              {cardsCount > 2
                ? `Card ${num + 1} of ${cardsCount}`
                : "Not enough cards"}
            </h5>
            <p class="card-text">
              {cardsCount > 2
                ? txt
                : `You need at least 3 cards to study. There are ${cardsCount} cards in this deck`}
            </p>
            {cardsCount < 3 ? (
              <Link to={`/decks/${deck.id}/cards/new`} class="btn btn-primary">
                + Add cards
              </Link>
            ) : (
              ""
            )}
            {cardsCount > 2 ? (
              <button
                type="button"
                class="btn btn-secondary"
                onClick={flipCard}
              >
                Flip
              </button>
            ) : (
              ""
            )}
            {nextCard ? (
              <button
                type="button"
                class="btn btn-primary"
                onClick={showNextCard}
              >
                Next
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Study;
