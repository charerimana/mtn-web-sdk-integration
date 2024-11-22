import React from 'react';
import './InputBox.scss';

function InputBox({ displayName, placeholder, onChange }) {
  const handleInputChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="input-box">
      <label htmlFor="name-input" className="input-box__label">
        { displayName }
      </label>
      <input
        type="text"
        id="name-input"
        className="input-box__input"
        placeholder={ placeholder }
        onChange={handleInputChange}
      />
    </div>
  );
}

export default InputBox;
