// Modal.js
import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, children, theme }) => {
  if (!isOpen) return null;

  // Conditional classes based on theme
  const modalBgClass = theme === 'dark' ? 'bg-black' : 'bg-white';
  const overlayBgClass = 'bg-black bg-opacity-50';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const buttonTextClass = theme === 'dark' ? 'text-gray-400 hover:text-[#00df9a]' : 'text-gray-500 hover:text-[#00df9a]';
  const borderClass = theme === 'dark' ? 'border-[#00df9a]' : 'border-gray-300';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className={`fixed inset-0 ${overlayBgClass}`}
        onClick={onClose}
      ></div>
      <div className={`relative z-10 max-w-lg w-full rounded-lg shadow-lg p-6 ${modalBgClass} border ${borderClass}`}>
        <button
          className={`absolute top-4 right-4 text-2xl font-bold ${buttonTextClass}`}
          onClick={onClose}
        >
          &times;
        </button>
        {title && <h2 className={`text-2xl font-bold mb-4 ${textClass} font-rajdhani`}>{title}</h2>}
        <div className={`${textClass} font-rajdhani`}>{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
};

Modal.defaultProps = {
  theme: 'dark',
};

export default Modal;
