import React from 'react';
import '../css/component/alert.css'; // Import the CSS file for styling'

interface AlertType{
	message: string;
	isVisible: boolean;
  onClose: () => void;
	successs: boolean;

}

const FloatingAlert = ({ message, isVisible, onClose, successs }: AlertType) => {
  return (
    <div className={`${successs ? 'success-alert' : 'failed-alert'} floating-alert ${isVisible ? 'show' : ''}`}>
      <span>{message}</span>
      <button onClick={onClose} className="close-btn">×</button>
    </div>
  );
};

export default FloatingAlert;
