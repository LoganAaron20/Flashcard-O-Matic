import React from "react";

const CardForm = ({
  onSubmit,
  onCancel,
  submitLabel,
  cancelLabel,
  formData,
  setFormData,
}) => {
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="card-front">Front</label>
        <textarea
          required
          type="text"
          defaultValue={formData.front}
          className="form-control"
          onChange={handleChange}
          name="front"
          id="card-front"
        />
      </div>
      <div className="form-group">
        <label htmlFor="card-back">Back</label>
        <textarea
          required
          type="text"
          defaultValue={formData.back}
          className="form-control"
          onChange={handleChange}
          name="back"
          id="card-back"
        />
      </div>
      <div>
        <button
          className="btn btn-secondary mr-1"
          onClick={onCancel}
          type="button"
        >
          {cancelLabel}
        </button>
        <button className="btn btn-primary mr-1" type="submit">
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default CardForm;
