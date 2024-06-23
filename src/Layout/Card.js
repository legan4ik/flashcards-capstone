import React from "react";
import { Link } from "react-router-dom";
import { deleteCard } from "../utils/api";

function Card({ card, setFetchDeckInfo }) {
  const handleDeleteCard = (cardId) => {
    if (
      window.confirm(
        "Delete this Card?\nYou will not be able to recover it."
      ) === true
    ) {
      deleteCard(cardId);
      setFetchDeckInfo(true);
    }
  };

  return (
    <tr>
      <td>
        <div>{card.front}</div>
      </td>
      <td>
        <div>{card.back}</div>
        <div className="cardBack">
          <Link
            to={`/decks/${card.deckId}/cards/${card.id}/edit`}
            class="btn btn-secondary"
          >
            Edit
          </Link>
          <button
            type="button"
            class="btn btn-danger"
            onClick={() => handleDeleteCard(card.id)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Card;
