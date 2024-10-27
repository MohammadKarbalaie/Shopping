import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-4 rounded shadow-lg">
      {children}
      <button className='px-4 ml-4 mt-2 bg-sky-500 py-1 text-white' onClick={onClose}>Close</button>
    </div>
  </div>
);

export default Modal;