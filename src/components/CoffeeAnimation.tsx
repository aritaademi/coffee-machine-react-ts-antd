import React from 'react';

const CoffeeAnimation: React.FC = () => {
  return (
    <div className="flex justify-center my-6">
      <div className="relative w-[80px] h-[120px] border-4 border-gray-800 rounded-b-full bg-white overflow-hidden">
        <div className="absolute bottom-0 w-full bg-[#6f4e37] animate-fill"></div>
      </div>
    </div>
  );
};

export default CoffeeAnimation;
