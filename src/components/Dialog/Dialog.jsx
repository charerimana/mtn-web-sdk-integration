import React, { useEffect, useRef } from 'react';
import './Dialog.scss';

const FALLBACK_API_URL = 'https://eu.orchestration.truststamp.net/api/v2';

function Dialog({ isOpen, onClose, sessionId }) {
  const tsSdkContainerRef = useRef(null);

  const loadSdk = async () => {
    try {
      await TS_SDK.init({
        API_URL: process.env.API_URL || FALLBACK_API_URL,
      });

      if (tsSdkContainerRef.current) {
        TS_SDK.ExperienceUI.renderTo(tsSdkContainerRef.current, {
          sessionId,
          // To see all possible props, check out this link
          // https://eu.orchestration.truststamp.net/sdk-docs/docs/js/WIDGET%20ExperienceUI
        });
      }
    } catch (err) {
      console.error('Failed to initialize TS_SDK:', err); // eslint-disable-line no-console
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadSdk();
    }
  }, [isOpen]);

  const handleCloseDialog = () => {
    TS_SDK.reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="dialog">
      <div className="dialog__content">
        <div className="dialog__header">
          <button type="button" className="dialog__close" onClick={handleCloseDialog}>
            &times;
          </button>
        </div>
        <div ref={tsSdkContainerRef} />
      </div>
    </div>
  );
}

export default Dialog;
