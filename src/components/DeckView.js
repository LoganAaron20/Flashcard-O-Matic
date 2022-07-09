import { useEffect, useState } from "react";
import { readDeck } from "../utils/api";
import Navigation from "../Layout/Navigation";
import { useParams } from "react-router-dom";
import DeckInfo from "./DeckInfo";

// RENDERS THE DECK VIEW FOR A SINGLE DECK;

const DeckView = () => {
  let { deckId } = useParams();
  const [currentDeck, setCurrentDeck] = useState({});
  const [cardsInDeck, setCardsInDeck] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const response = readDeck(deckId);
      const data = await response;
      setCurrentDeck(data);
      let { cards } = data;
      setCardsInDeck(cards);
    }

    loadDecks();
  }, [deckId]);

  return (
    <>
      <Navigation deckView={currentDeck} />
      <DeckInfo deck={currentDeck} cards={cardsInDeck} />
    </>
  );
};

export default DeckView;
