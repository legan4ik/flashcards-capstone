import React from "react";
import Deck from "./Deck";
import { Link, Routes, Route } from "react-router-dom";

function DeckList({ decks, setMainFetch }) {
  return (
    <>
      <Link to="/decks/new" class="btn btn-secondary">
        + Create Deck
      </Link>
      {decks.map((deck) => (
        <Deck deck={deck} cards={deck.cards} setMainFetch={setMainFetch}  />
      ))}
    </>
  );
}

/*
 <Routes>
        <Route path="/" element={<Layout />}/>
    </Routes>
*/

export default DeckList;
