import React, { useState, useEffect } from 'react';

interface SidebarProps {
  history: {
    color: string;
    correct: boolean;
    time: number;
  }[];
}

const Sidebar: React.FC<SidebarProps> = ({ history }) => {
  return (
    <div className="w-full text-sm lg:text-lg  font-semibold bg-gray-300 h-full">
      <h1>Current/Latest game</h1>
      <div className="w-full overflow-y-auto" style={{ height: 'calc(100% - 30px)' }}>
        {history.map((item, index) => (
          <div key={index} className="flex items-center my-2 text-sm font-sm">
            <div
              style={{ backgroundColor: item.color, width: '100px', height: '40px', marginRight: '10px' }}
            ></div>
            {item.correct ? (
              <span>&#10004;</span> // Checkmark for correct
            ) : (
              <span>&#10006;</span> // Cross for incorrect
            )}
            <span className="ml-2">
            {item.time} s
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
