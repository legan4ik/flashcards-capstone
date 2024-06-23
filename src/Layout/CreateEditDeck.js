import React from "react";
import BreadCrumb from "./Breadcrumb"; 
import { Link } from "react-router-dom";
import { createDeck, updateDeck } from "../utils/api";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CreateEditDeck({screenName, setFetch, deckName="", deckDescription=""}){

let breadcrumbs = []

let { deckId } = useParams();

if (!deckName) {
    breadcrumbs = [{name: screenName, last: true}]
} else {
    breadcrumbs = [{name: deckName, last: false, link: `/decks/${deckId}`}, {name: screenName, last: true}]
}

const [name, setName] = useState(deckName);
const [description, setDescription] = useState(deckDescription);


const navigate = useNavigate();

async function handleDeckSubmit(event){
    event.preventDefault();
    if (deckName) {
        await updateDeck({name: name, description: description, id: deckId})
        setName('')
        setDescription('');
        setFetch(true)  ;    
        navigate(`/decks/${deckId}`);
    } else {
    await createDeck({name: name, description: description})
    setName('')
    setDescription('');
    setFetch(true)  ;
    navigate(`/`);
     }

  }

return (
    <>
        <BreadCrumb items={breadcrumbs} ></BreadCrumb>
        <form>
            <div class="form-group">
            <h2>{screenName}</h2>
            <label for="name">Name</label>
            <input class="form-control" name="name" id="deckName" value={name} onChange={(e) => setName(e.target.value)} placeholder="Deck Name"/>
            </div>
            <div class="form-group">
            <label for="description">Descriptions</label>
            <textarea class="form-control" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description of the deck"/>
            </div>
            <Link to="/" class="btn btn-secondary">Cancel</Link>
            <button type="submit" class="btn btn-primary" onClick={handleDeckSubmit}>Submit</button>
        </form>
    </>
    )
}

export default CreateEditDeck;