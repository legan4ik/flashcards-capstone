import React from "react";
import Header from "./Header";
import CreateEditDeck from "./CreateEditDeck.js";
import ViewDeck from "./ViewDeck.js";
import Deck from "./Deck.js";
import NotFound from "./NotFound";
import { Link, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { listDecks } from "../utils/api";

function Layout() {
  const [decks, setDecks] = useState([]);
  const [fetchDecks, setFetchDecks] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadInfo() {
      const response = await listDecks(abortController.signal);
      await setDecks(response);
    }
    loadInfo();
    setFetchDecks(false);
    return () => {
      abortController.abort(); // Cancels any pending request or response
      setDecks([]);
    };
  }, [fetchDecks]);

  if (decks.length === 0) {
    return (
      <>
        <Header />
        <div className="container">
          <h2>Loading...</h2>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <div className="container">
          <Routes>
            <Route
              path=""
              element={
                <>
                  <Link to="/decks/new" class="btn btn-secondary">
                    + Create Deck
                  </Link>
                  {decks.map((deck) => (
                    <Deck deck={deck} setFetchDecks={setFetchDecks} />
                  ))}
                </>
              }
            />
            <Route
              path="/decks/new"
              element={<CreateEditDeck setFetch={setFetchDecks} />}
            />
            <Route
              path="/decks/:deckId/*"
              element={<ViewDeck setFetchDecks={setFetchDecks} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default Layout;

//TODO
// styling
// not found for other paths

// number of cards - main screen

// fetch on for edit card/deck
// delete deck
// no cards - show deck
//Study!
