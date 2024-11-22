import React, { useState } from 'react';

import InputBox from './components/InputBox/InputBox';
import Button from './components/Button/Button';
import Dialog from './components/Dialog/Dialog';

const DISPLAY_TEXT = `To complete verification, a session ID is required;
once provided, the verify button will be enabled.`;

function App() {
  const [sessionId, setSessionId] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (value) => {
    setSessionId(value);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const closeModal = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="App">
      <h1>Verify Your Identity</h1>
      <p>{ DISPLAY_TEXT }</p>
      <InputBox
        displayName="Session ID"
        placeholder="Provide session ID"
        onChange={handleInputChange}
      />
      <Button onClick={handleOpenModal} disabled={!sessionId.trim()} />
      <Dialog sessionId={sessionId} isOpen={isDialogOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
