// ALLOWS USER TO ADD A NEW CARD TO AN EXISTING DECK;

import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Navigation from "../Layout/Navigation";
import { createCard, readDeck } from "../utils/api";
import CardForm from "./CardForm";

const CardAdd = () => {
  let { deckId } = useParams();
  const history = useHistory();
  const [currentDeck, setCurrentDeck] = useState({});
  const [formData, setFormData] = useState({
    front: "",
    back: "",
  });

  const blankCard = {
    front: "",
    back: "",
  };

  useEffect(() => {
    async function getDeck() {
      const response = readDeck(deckId);
      const data = await response;
      setCurrentDeck(data);
    }

    getDeck();
  }, [deckId]);

  function handleCreateCard(event) {
    event.preventDefault();
    createCard(deckId, formData);
    setFormData(blankCard);
    history.go(0);
  }

  return (
    <div>
      <Navigation deck={currentDeck} pageName="Add Card" />

      <h1>{currentDeck.name}: Create Card</h1>

      <CardForm
        onSubmit={handleCreateCard}
        onCancel={() => history.push(`decks/${currentDeck.id}`)}
        submitLabel="Save"
        cancelLabel="Done"
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default CardAdd;
