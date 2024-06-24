import React from "react";
import ViewDeck from "./ViewDeck.js";
import Deck from "./Deck.js";
import Study from "./Study.js";
import NotFound from "./NotFound.js";
import CreateEditDeck from "./CreateEditDeck";
import { Link, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { listDecks } from "../utils/api/index.js";

function DeckList() {
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
    return <h2>Loading...</h2>;
  } else {
    return (
      <>
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
            path="decks/new"
            element={<CreateEditDeck setFetch={setFetchDecks} />}
          />
          <Route path="decks/:deckId/study" element={<Study />} />
          <Route
            path="decks/:deckId/*"
            element={<ViewDeck setFetchDecks={setFetchDecks} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  }
}

export default DeckList;
