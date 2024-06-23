import React from "react";
import BreadCrumb from "./Breadcrumb"; 
import { Link } from "react-router-dom";
import { updateCard, createCard } from "../utils/api";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CreateEditCard({screenName,  setFetch, deckName, cards=null}){
    
let  breadcrumbs = []

let { cardId } = useParams();
let { deckId } = useParams();

let cardInfo = {}

if (cards) {
    cardInfo = cards.filter((card) => card.id == cardId)[0]
    breadcrumbs = [{name: deckName, last: false, link: `/decks/${deckId}`}, {name: screenName+` ${cardId}`, last: true}]
} else {
    breadcrumbs = [{name: deckName, last: false, link: `/decks/${deckId}`}, {name: screenName, last: true}]
}

const [front, setFront] = useState(cardInfo ? cardInfo.front : "");
const [back, setBack] = useState(cardInfo ? cardInfo.back : "");

const navigate = useNavigate();

async function handleSubmit(event){
    event.preventDefault();
    if (cardId) {
      await updateCard({front: front, back: back, id: cardId, deckId: parseInt(deckId)})
    } else {
    await createCard(deckId, {front, back})
    }
    setFront('')
    setBack('');
    setFetch(true)
    navigate(`/decks/${deckId}`);
  }


return (
    <>
        <BreadCrumb items={breadcrumbs} ></BreadCrumb>
        <form>
            <div class="form-group">
            <h2>{deckName}: {screenName}</h2>
            <label for="front">Front</label>
            <textarea class="form-control" name="front" id="front" value={front} onChange={(e) => setFront(e.target.value)} placeholder="Front side of the card"/>
            </div>
            <div class="form-group">
            <label for="back">Back</label>
            <textarea class="form-control" id="back" name="back" value={back} onChange={(e) => setBack(e.target.value)} placeholder="Back side of the card"/>
            </div>
            <Link to={`/decks/${deckId}`} class="btn btn-secondary">Cancel</Link>
            <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </form>
    </>
    )
}

export default CreateEditCard;