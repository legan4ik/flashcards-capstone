import React from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

function CardList({ cards, handleDeleteCard }) {


return (
    <>
      <table style={{width:"100%",border: "1px solid black"}} >
      {cards.map((card) => <Card card={card} handleDeleteCard={handleDeleteCard}/>)}
      </table>
    </>
  );
}

/*
 <Routes>
        <Route path="/" element={<Layout />}/>
    </Routes>
*/

export default CardList;
