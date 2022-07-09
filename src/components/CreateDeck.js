import { useHistory, Link } from "react-router-dom";
import Navigation from "../Layout/Navigation";
import { createDeck } from "../utils/api";
import { useState } from "react";

const CreateDeck = () => {
  const history = useHistory();
  const initialFormState = {
    name: "",
    description: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: [target.value],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createDeck(formData);
    const deckId = response.id;
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      <Navigation pageName="Create Deck" />
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            onChange={handleChange}
            placeholder="Deck Name"
            className="form-control"
          />
          <label htmlFor="description">Description</label>
          <textarea
            required
            type="text"
            id="description"
            name="description"
            onChange={handleChange}
            placeholder="Brief description of the deck"
            className="form-control"
          />
        </div>
        <Link to="/">
          <button className="btn btn-secondary">Cancel</button>
        </Link>
          <button className="btn btn-primary">Submit</button>
      </form>
    </>
  );
};

export default CreateDeck;
