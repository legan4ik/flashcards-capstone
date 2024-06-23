import React from "react";
import BreadCrumb from "./Breadcrumb"; 
import { Link, Routes, Route } from "react-router-dom";
import { createDeck } from "../utils/api";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditDeck({screenName}){

const breadcrumbs = [{name: screenName, last: true}]

let { deckId } = useParams();

const [name, setName] = useState("");
const [description, setDescription] = useState("");


const navigate = useNavigate();

async function newDeckHandle(event){
  event.preventDefault();
  await createDeck({name: {name}, description: {description}})
  setName('')
  setDescription('');
  navigate('/');
}

return (
    <div>
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
            <button type="submit" class="btn btn-primary" onClick={newDeckHandle}>Submit</button>
        </form>
    </div>
    )
}

export default NewDeck;