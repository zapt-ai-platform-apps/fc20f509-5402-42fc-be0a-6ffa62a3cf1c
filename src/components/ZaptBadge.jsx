import React from 'react';

const ZaptBadge = () => {
  return (
    <div className="fixed bottom-4 left-4 z-10">
      <a 
        href="https://www.zapt.ai" 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-white text-blue-600 font-medium px-3 py-1.5 rounded-lg shadow-md hover:shadow-lg transition-all text-sm flex items-center"
      >
        Made on ZAPT
      </a>
    </div>
  );
};

export default ZaptBadge;