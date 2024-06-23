import React from "react";
import Card from "./Card";
import BreadCrumb from "./Breadcrumb"; 
import { Link, Routes, Route, useParams, useNavigate  } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api";

function Study(){
const [deck, setDeck] = useState(false);
const [num, setNum] = useState(0);
const [nextCard, setNextCard] = useState(false);
const [cardText, setCardText] = useState('');
let { deckId } = useParams();
//let deck = "";
//.then((value) => {
//    deck = value;
//});
const navigate = useNavigate();
const handleRestartCards = () => {
    if (window.confirm("Restart cards?") == true) {
        setNum(0)
        setCardText('')
        setNextCard(false)
    } else {
        navigate('/');
    }
 }

useEffect(() => {
    const abortController = new AbortController();
    async function loadInfo() {
       
      const response = await readDeck(deckId, abortController.signal);
      //const info = await response.json();
      await setDeck(response);
      console.log(`response!: ${JSON.stringify(response)}`)
      console.log(`Hello: ${JSON.stringify(deck)}`)
      //if(Object.entries(deck).length !== 0){
      //  console.log("Deck non empty")
      //} else {
      //  console.log("Deck IS empty")
      //}
      //if (response) {
      //  console.log(!deck)
      //}
      //return response
      //setCardText(deck.cards[0].front)
    }
    loadInfo();
    console.log(`Hello123: ${JSON.stringify(deck)}`)
    return () => {
        abortController.abort(); // Cancels any pending request or response
        //setDeck({})
      };
}, [deckId]);

const flipCard = () => {
    if (cardText === deck.cards[num].back) {
        setCardText(deck.cards[num].front)
        setNextCard(false)
    } else {
        setCardText(deck.cards[num].back)
        setNextCard(true)
    }
}

const showNextCard = () => {
    if (num > deck.cards.length-2) {
        handleRestartCards()
    } else {
    setCardText(deck.cards[num+1].front)
    setNum(num + 1)
    setNextCard(false)
    }
}

if (!deck || !deck.cards || deck.cards.length === 0) {

    console.log(`Deck: NO DECK!`)
    console.log(`Deck: ${JSON.stringify(deck)}`)
    return "Loading"
} else{

const cardsCount = deck.cards.length
const breadcrumbs = [{name: deck.name, last: false, link: ''}, {name: 'Study', last: true}]
if (cardsCount < 3) {
    return (
        <>
        <BreadCrumb items={breadcrumbs} ></BreadCrumb>
        <h2>Study: {deck.name}</h2>
        <div class="card">
        <div class="card-body">
        <h5 class="card-title">Not enough cards</h5>
        <p class="card-text">You need at least 3 cards to study. There are {cardsCount} cards in this deck</p>
        <Link to={`/decks/${deck.id}`} class="btn btn-primary">+ Add cards</Link>
        </div>
        </div>
    
        </>
    )
}
return (
    <>
    <BreadCrumb items={breadcrumbs} ></BreadCrumb>
    <h2>Study: {deck.name}</h2>
    <div class="card">
    <div class="card-body">
    <h5 class="card-title">Card {num+1} of {cardsCount}</h5>
    <p class="card-text">{cardText ? cardText: deck.cards[0].front}</p>
    <button type="button" class="btn btn-secondary" onClick={flipCard}>Flip</button>
    {nextCard ? <button type="button" class="btn btn-primary" onClick={showNextCard}>Next</button>: <></>}
    </div>
    </div>

    </>
)
}
}

/*
 <Routes>
        <Route path="/" element={<Layout />}/>
    </Routes>
        <Card cards={deck.cards}/>
*/

export default Study;