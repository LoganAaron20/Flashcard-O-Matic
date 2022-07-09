// ALLOWS USER TO MODIFY INFORMATION ON AN EXISTING DECK

import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Navigation from "../Layout/Navigation";
import { readCard, readDeck, updateCard } from "../utils/api";
import CardForm from "./CardForm";

const CardEdit = () => {
  let { deckId, cardId } = useParams();
  const history = useHistory();
  const [currentDeck, setCurrentDeck] = useState({});
  const [formData, setFormData] = useState({});

  useEffect(() => {
    async function getDeck() {
      const response = readDeck(deckId);
      const deckData = await response;
      setCurrentDeck(deckData);
      const cardResponse = readCard(cardId);
      const cardData = await cardResponse;
      setFormData(cardData);
    }

    getDeck();
  }, [deckId, cardId]);

  async function handleEditCard(event) {
    event.preventDefault();
    await updateCard(formData);
    console.log(formData);
    history.push(`/decks/${currentDeck.id}`);
  }

  return (
    <div>
      <Navigation deck={currentDeck} card={formData} />
      <h1>Edit Card</h1>

      <CardForm
        onSubmit={handleEditCard}
        onCancel={() => history.push(`/decks/${currentDeck.id}`)}
        submitLabel="Save"
        cancelLabel="Done"
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default CardEdit;
