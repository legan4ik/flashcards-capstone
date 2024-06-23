import React from "react";
import Deck from "./Deck";
import Study from "./Study";
import CreateEditCard from "./CreateEditCard";
import CreateEditDeck from "./CreateEditDeck";
import BreadCrumb from "./Breadcrumb";
import CardList from "./CardList";
import { Routes, Route, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { readDeck } from "../utils/api";

function ViewDeck({ setFetchDecks }) {
  const [deck, setDeck] = useState(false);
  const [fetchDeckInfo, setFetchDeckInfo] = useState(false);
  let { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadInfo() {
      const response = await readDeck(deckId, abortController.signal);
      await setDeck(response);
    }
    loadInfo();
    setFetchDeckInfo(false);
    return () => {
      abortController.abort(); // Cancels any pending request or response
      setDeck({});
    };
  }, [deckId, fetchDeckInfo]);

  if (!deck.cards) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <>
        <Routes>
          <Route
            path=""
            element={
              <>
                <BreadCrumb
                  items={[
                    { name: deck.name, last: true, link: `/decks/${deckId}` },
                  ]}
                />
                <Deck
                  deck={deck}
                  setFetchDecks={setFetchDecks}
                  deckEdit={true}
                />
                <CardList
                  cards={deck.cards}
                  setFetchDeckInfo={setFetchDeckInfo}
                />
              </>
            }
          />
          <Route path="study" element={<Study />} />
          <Route
            path="edit"
            element={<CreateEditDeck setFetch={setFetchDeckInfo} />}
          />
          <Route
            path="cards/new"
            element={
              <CreateEditCard
                screenName="Add Card"
                setFetch={setFetchDeckInfo}
                deckName={deck.name}
              />
            }
          />
          <Route
            path="cards/:cardId/edit"
            element={
              <CreateEditCard
                screenName="Edit Card"
                setFetch={setFetchDeckInfo}
                deckName={deck.name}
              />
            }
          />
        </Routes>
      </>
    );
  }
}
export default ViewDeck;
