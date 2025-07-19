
import React from 'react';

export default function TopThree({ users, onClaim }) {
  const colors = ['#00FF9E', '#8E44AD', '#FBC02D']; 

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8 px-4">
      {users.slice(0, 3).map((u, idx) => (
        <div
          key={u._id}
          className={`relative flex flex-col items-center p-4 rounded-2xl ${
            idx === 1 ? 'scale-105 md:scale-110' : 'opacity-90'
          } bg-[#1F2430] transition-transform w-full max-w-[160px] sm:max-w-[200px]`}
        >
         
          <div
            className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm sm:text-base"
            style={{ background: colors[idx], color: '#0F111A' }}
          >
            {idx + 1}
          </div>

          
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-[#CCCCCC] mb-2 bg-[#203a43] flex items-center justify-center text-xl sm:text-2xl">
            <span className="text-[#CCCCCC] font-bold">
              {u.name.charAt(0)}
            </span>
          </div>

          <div className="text-white text-center font-semibold text-sm sm:text-base">{u.name}</div>
          <div className="text-[#00FF9E] font-bold text-sm sm:text-base">
            {u.totalPoints.toLocaleString()}
          </div>

          
          <button
            onClick={() => onClaim(u._id,u.name)}
            className="mt-3 bg-[#00FF9E] hover:bg-[#8E44AD] text-[#0F111A] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition"
          >
            Claim
          </button>
        </div>
      ))}
    </div>
  );
}
