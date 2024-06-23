import React from "react";
import Header from "./Header";
import DeckList from "./DeckList";
import CreateEditDeck from "./CreateEditDeck.js";
import ViewDeck from "./ViewDeck.js";
import Deck from "./Deck.js";
import Study from "./Study";
import Card from "./Card.js";
import NotFound from "./NotFound";
import { Link, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Decks from "../data/db.json"
import { listDecks } from "../utils/api";

function Layout() {
  //console.log(window.history)
  const [decks, setDecks] = useState([]);
  const [fetch, setFetch] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadInfo() {
       
      const response = await listDecks();
      console.log(response)
      await setDecks(response);
    }
    loadInfo();
    setFetch(false);
    return () => {
        abortController.abort(); // Cancels any pending request or response
        //setDeck({})
      };
}, [fetch]);

if (decks.length === 0) {
  return <h2>Still loading</h2>
} else {
  console.log(decks)
  return (
    <>
      <Header />
      <div className="container">
      <Routes>
      <Route path="" element={<DeckList decks={decks} setMainFetch={setFetch}/>}/>
      <Route path="/decks/new" element={<CreateEditDeck setFetch={setFetch} screenName="Create Deck"/>}/>
      <Route path="/decks/:deckId/*" element={<ViewDeck decks={decks} setMainFetch={setFetch}/>} />
      <Route path="*" element={<NotFound />}/>
      </Routes>
      </div>
    </>
  );
}
}
//

//       
//              <Route path="/decks/:deckId/study" element={<Study/>} />
//
export default Layout;

//TODO
// styling
// not found for other paths

// number of cards - main screen

// fetch on for edit card/deck
// delete deck
// no cards - show deck

