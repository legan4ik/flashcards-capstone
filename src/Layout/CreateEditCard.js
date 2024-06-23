import React from "react";
import BreadCrumb from "./Breadcrumb";
import { Link } from "react-router-dom";
import { updateCard, createCard, readCard } from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CreateEditCard({ setFetch, deckName }) {
  let breadcrumbs = [];
  let { cardId } = useParams();
  let { deckId } = useParams();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  let screenName = "Add Card";
  if (cardId) {
    screenName = "Edit Card";
    breadcrumbs = [
      { name: deckName, last: false, link: `/decks/${deckId}` },
      { name: `${screenName} ${cardId}`, last: true },
    ];
  } else {
    breadcrumbs = [
      { name: deckName, last: false, link: `/decks/${deckId}` },
      { name: screenName, last: true },
    ];
  }

  useEffect(() => {
    const abortController = new AbortController();
    async function loadInfo() {
      const card = await readCard(cardId, abortController.signal);
      setFront(card.front);
      setBack(card.back);
    }
    if (cardId) {
      loadInfo();
    }
    return () => {
      abortController.abort(); // Cancels any pending request or response
      //setDeck({})
    };
  }, [cardId]);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (cardId) {
      await updateCard({
        front: front,
        back: back,
        id: cardId,
        deckId: parseInt(deckId),
      });
    } else {
      await createCard(deckId, { front, back });
    }
    setFront("");
    setBack("");
    setFetch(true);
    navigate(`/decks/${deckId}`);
  }

  return (
    <>
      <BreadCrumb items={breadcrumbs}></BreadCrumb>
      <form>
        <div class="form-group">
          <h2>
            {cardId ? "" : `${deckName}: `}
            {screenName}
          </h2>
          <label for="front">Front</label>
          <textarea
            class="form-control"
            name="front"
            id="front"
            value={front}
            onChange={(e) => setFront(e.target.value)}
            placeholder="Front side of the card"
          />
        </div>
        <div class="form-group">
          <label for="back">Back</label>
          <textarea
            class="form-control"
            id="back"
            name="back"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            placeholder="Back side of the card"
          />
        </div>
        <Link to={`/decks/${deckId}`} class="btn btn-secondary">
          Cancel
        </Link>
        <button type="submit" class="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateEditCard;
