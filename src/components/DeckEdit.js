import { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import Navigation from "../Layout/Navigation";
import { readDeck, updateDeck } from "../utils/api";

const DeckEdit = () => {
  const [formData, setFormData] = useState({});
  const history = useHistory();
  let { deckId } = useParams();

  useEffect(() => {
    async function setDeck() {
      const response = readDeck(deckId);
      const data = await response;
      setFormData(data);
    }
    setDeck();
  }, [deckId]);

  function handleChange({ target }) {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await updateDeck(formData);
    history.push(`/decks/${deckId}`);
  }

  return (
    <>
      <Navigation deck={formData} pageName="Edit Deck" />
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            required
            name="name"
            type="text"
            onChange={handleChange}
            className="form-control"
            defaultValue={formData.name}
          ></input>
        </div>
        <div className="form-control">
          <label htmlFor="description">Description</label>
          <textarea
            required
            name="description"
            type="text"
            className="form-control"
            onChange={handleChange}
            defaultValue={formData.description}
          ></textarea>
        </div>
        <div>
          <Link to={`/decks/${formData.id}`}>
            <button className="btn btn-secondary">Cancel</button>
          </Link>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </>
  );
};

export default DeckEdit;
