import React from "react";
import Deck from "./Deck";

import Study from "./Study";
import CreateEditCard from "./CreateEditCard";
import CreateEditDeck from "./CreateEditDeck";
import CardList from "./CardList";
import BreadCrumb from "./Breadcrumb"; 
import { Link, Routes, Route, useParams, useNavigate  } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck, deleteCard } from "../utils/api";

function ViewDeck({setMainFetch}){
const [deck, setDeck] = useState(false);
const [fetch, setFetch] = useState(false);
let { deckId } = useParams();


useEffect(() => {
        const abortController = new AbortController();
        async function loadInfo() {
           
          const response = await readDeck(deckId, abortController.signal);
          await setDeck(response);
        }
        loadInfo();
        setFetch(false);
        return () => {
            abortController.abort(); // Cancels any pending request or response
            //setDeck({})
          };
    }, [deckId, fetch]);

const handleDeleteCard = (cardId) => {
        if (window.confirm("Delete this Card?\nYou will not be able to recover it.") == true) {
          deleteCard(cardId);
          setFetch(true);
          //navigate(`/decks/${card.deckId}`);
        }
}

if (!deck || !deck.cards || deck.cards.length === 0) {
    return <h2>Still loading</h2>
} else {

    return (<>

    <Routes>
            <Route path="" element={<><Deck deck={deck} setMainFetch={setMainFetch} cards={deck.cards} deckEdit={true}/> <CardList cards={deck.cards} handleDeleteCard={handleDeleteCard} /></>}  />
            <Route path="edit" element={<CreateEditDeck screenName="Edit Deck" setFetch={setFetch} deckName={deck.name} deckDescription={deck.description}/>}/>
            <Route path="study" element={<Study/>} />
            <Route path="cards/new" element={<CreateEditCard screenName="Add Card"  setFetch={setFetch} deckName={deck.name}/>} />
            <Route path="cards/:cardId" element={<CreateEditCard screenName="Edit Card" setFetch={setFetch}  cards={deck.cards} deckName={deck.name}/>} />
    </Routes>
    </>
    );
    }
}

/*
 <Routes>
        <Route path="/" element={<Layout />}/>
    </Routes>
        <BreadCrumb items={breadcrumbs} />
*/

export default ViewDeck;