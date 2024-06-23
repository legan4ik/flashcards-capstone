import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function Deck({ deck, cards, setMainFetch, deckEdit=false }){

//const deckId = useParams()


//const numCards = cards.filter((card) => card.deckId===deck.id)
//const numCards = cards
//console.log(`Deck: ${cards}`)
const navigate = useNavigate();
async function handleDeleteDeck (deckId) {
   if (window.confirm("Delete this deck?\nYou will not be able to recover it.") == true) {
        await deleteDeck(deckId);
        setMainFetch(true);
        navigate('/');
   }
}

return (<div class="card">
<div class="card-body">
  <h5 class="card-title">{deck.name}{deckEdit? "": " - "+cards.length}</h5>
  <p class="card-text">{deck.description}</p>
  
  <Link to={deckEdit? `/decks/${deck.id}/edit`: `/decks/${deck.id}`} class="btn btn-secondary">{deckEdit? "Edit": "View"}</Link>
  
  <Link to={`/decks/${deck.id}/study`} class="btn btn-primary">Study</Link>
  {deckEdit ? <Link to={`/decks/${deck.id}/cards/new`} class="btn btn-primary">+ Add Cards</Link> : ""}
  <button type="button" class="btn btn-danger" onClick={()=>handleDeleteDeck(deck.id)}>Delete</button>
</div>
</div>)
}

export default Deck;