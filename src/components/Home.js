import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

// import { useHistory } from "react-router-dom";

//  SHOWS A LIST OF DECKS WITH THE OPTION TO CREATE, STUDY, VIEW, OR DELETE A DECK;

const Home = () => {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadDecks() {
      const response = listDecks();
      const data = await response;
      setDecks(data);
    }

    loadDecks();
  }, []);

  const handleDelete = (deckId) => {
    if (
      window.confirm(
        "Delete this deck? \n \n You will not be able to recover it."
      )
    ) {
      deleteDeck(deckId);
      history.go(0);
    }
  };

  return (
    <>
      <Link to="/decks/new">
        <button className="btn btn-secondary mb-3"> Create Deck</button>
      </Link>
      <div className="w-100">
        {decks.map((deck, index) => {
          return (
            <div key={index} className="card px-5 py-3 mb-3">
              <div className="row d-flex justify-content-between">
                <h2>{deck.name}</h2>
                <h5 className="card-count">{deck.cards.length} cards</h5>
              </div>
              <p>{deck.description}</p>
              <div className="row">
                <Link to={`/decks/${deck.id}`}>
                  <button className="btn btn-secondary pl-1 mr-1">👁View</button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                  <button className="btn btn-primary mr-1">📖Study</button>
                </Link>
                <button
                  onClick={() => handleDelete(deck.id)}
                  className="btn btn-danger px-2 ml-auto"
                >
                  🗑️{" "}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
