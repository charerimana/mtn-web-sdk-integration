import React from 'react';
import './Button.scss';

function Button({ onClick, disabled }) {
  return (
    <button
      type="submit"
      className="button"
      onClick={onClick}
      disabled={disabled}
    >
      Verify
    </button>
  );
}

export default Button;
