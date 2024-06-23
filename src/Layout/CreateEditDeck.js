import React from "react";
import BreadCrumb from "./Breadcrumb";
import { Link } from "react-router-dom";
import { createDeck, updateDeck } from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";

function CreateEditDeck({ setFetch }) {
  let breadcrumbs = [];
  const [name, setName] = useState("");
  const [description, setDescription] = useState();
  let { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadInfo() {
      const deck = await readDeck(deckId, abortController.signal);
      setName(deck.name);
      setDescription(deck.description);
    }
    if (deckId) {
      loadInfo();
    }
    return () => {
      abortController.abort(); // Cancels any pending request or response
      //setDeck({})
    };
  }, [deckId]);

  if (!deckId) {
    breadcrumbs = [{ name: "Create Deck", last: true }];
  } else {
    breadcrumbs = [
      { name: name, last: false, link: `/decks/${deckId}` },
      { name: "Edit Deck", last: true },
    ];
  }

  const navigate = useNavigate();
  async function handleDeckSubmit(event) {
    event.preventDefault();
    let path = "/";
    if (deckId) {
      await updateDeck({ name: name, description: description, id: deckId });
      path = `/decks/${deckId}`;
    } else {
      await createDeck({ name: name, description: description });
    }
    setName("");
    setDescription("");
    setFetch(true);
    navigate(path);
  }

  if (deckId && !name) {
    return <h2>Loading</h2>;
  } else {
    return (
      <>
        <BreadCrumb items={breadcrumbs}></BreadCrumb>
        <form>
          <div class="form-group">
            <h2>{deckId ? "Edit Deck" : "Create Deck"}</h2>
            <label for="name">Name</label>
            <input
              class="form-control"
              name="name"
              id="deckName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Deck Name"
            />
          </div>
          <div class="form-group">
            <label for="description">Descriptions</label>
            <textarea
              class="form-control"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the deck"
            />
          </div>
          <Link to="/" class="btn btn-secondary">
            Cancel
          </Link>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={handleDeckSubmit}
          >
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default CreateEditDeck;
