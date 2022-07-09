import { useHistory, useParams, Link } from "react-router-dom";
import { deleteDeck } from "../utils/api";
import CardList from "./CardList";

// RENDERS A DECK AND OPTIONS

const DeckInfo = ({ deck, cards }) => {
  const history = useHistory();
  const { deckId } = useParams();

  const deleteDeckHandler = (deckId) => {
    if (
      window.confirm(
        "Delete this deck? \n \n You will not be able to recover it."
      )
    ) {
      deleteDeck(deckId);
      history.push("/");
    } else {
      console.log("Deletion cancelled");
    }
  };

  return (
    <>
      <div className="mb-4">
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <div className="row mx-auto">
          <Link to={`/decks/${deck.id}/edit`}>
            <button className="btn btn-secondary pl-1 mr-1">Edit</button>
          </Link>
          <Link to={`/decks/${deck.id}/cards/new`}>
            <button className="btn btn-primary mr-1">Add Cards</button>
          </Link>
          <button
            onClick={() => deleteDeckHandler(deckId)}
            className="btn btn-danger ml-auto"
          >
            Delete
          </button>
        </div>
      </div>
      <div>
        <h2>Cards</h2>{" "}
        {/* Need to insert list of corresponding cards to deck */}
        <CardList deck={cards} />
      </div>
    </>
  );
};

export default DeckInfo;
