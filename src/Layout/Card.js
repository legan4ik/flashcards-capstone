import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { deleteCard } from "../utils/api";

function Card({ card, handleDeleteCard = null }) {

  //const sz = cards.cards.size();
  const num = 0;
  console.log(`Cards: ${JSON.stringify(card)}`);

const navigate = useNavigate();

/*
const handleDeleteCard = (cardId) => {
  if (window.confirm("Delete this Card?\nYou will not be able to recover it.") == true) {
    deleteCard(cardId);
    navigate(`/decks/${card.deckId}`);
  }
} */


  if (!card) {
    return "No cards";
  } else {
    return (
      <tr>
          <td style={{ width: "50%" }}>
            <div>{card.front}</div>
          </td>
          <td style={{ width: "50%" }}>
            <div>{card.back}</div>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
            <Link to={`/decks/${card.deckId}/cards/${card.id}`} class="btn btn-secondary">Edit</Link>
              <button type="button" class="btn btn-danger" onClick={()=>handleDeleteCard(card.id)}>
                Delete
              </button>
            </div>
          </td>
      </tr>
    );
  }
}

//  <p class="card-text">{cards.cards[num].front}</p>

export default Card;
