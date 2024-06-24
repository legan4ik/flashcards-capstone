import React from "react";
import Header from "./Header";
import DeckList from "./DeckList.js";
import NotFound from "./NotFound";
import { Routes, Route } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<DeckList />}>
            <Route path="decks/*" />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
